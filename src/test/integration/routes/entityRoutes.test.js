import supertest from "supertest";
import app from "../../../server.js";

const request = supertest(app);

const TEST_USER_EMAIL = "user@example.com";
const TEST_USER_PASSWORD = "string";
let ACCESS_TOKEN;
let ENTITY_ID;

beforeAll(async () => {
    const loginResponse = await request.post("/api/auth/login").send({
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD
    });
    ACCESS_TOKEN = loginResponse.body.accessToken;
});

describe("EntityRoutes GET /user/entities integration Tests", () => {
    
    it("Deve retornar 404 se o usuário não possuir entidades cadastradas", async () => {
        const response = await request
            .get("/api/user/entities")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("status", 404);
    });

});

describe("EntityRoutes POST /user/entities integration test", () => {

    it("Deve retornar 400 se os body estiver inválidos", async () => {
        const response = await request
            .post("/api/user/entities")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send({
                name: "",
                description: "Descrição da nova entidade"
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("status", 400);
    });

    it("Deve permitir que um usuário autenticado crie uma nova entidade", async () => {
        const response = await request
            .post("/api/user/entities")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send({
                name: "Nova Entidade",
                description: "Descrição da nova entidade"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("entity.entity_id");
        expect(response.body.entity).toHaveProperty("name", "Nova Entidade");

        ENTITY_ID = response.body.entity.entity_id;
    });

});

describe("EntityRoutes GET /user/entities integration Tests", () => {
    
    it("Deve permitir que um usuário autenticado obtenha suas entidades", async () => {
        const response = await request
            .get("/api/user/entities")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

});

describe("EntityRoutes GET /user/entities/:id integration Tests", () => {

    it("Deve permitir que um usuário autenticado obtenha uma entidade específica", async () => {
        const response = await request
            .get(`/api/user/entities/${ENTITY_ID}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", ENTITY_ID);
    });

    it("Deve retornar 404 se a entidade não for encontrada", async () => {
        const response = await request
            .get(`/api/user/entities/999999`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Entidade não encontrada");
        expect(response.body).toHaveProperty("status", 404);
    });

});

describe("EntityRoutes PUT /user/entities/:id integration Tests", () => {

    const mockBody = {
        name: "Entidade Atualizada",
        description: "Descrição Atualizada"
    };

    it("Deve permitir que um usuário autenticado atualize uma entidade específica", async () => {
        const response = await request
            .put(`/api/user/entities/${ENTITY_ID}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send(mockBody);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Entidade atualizada com sucesso");
    });

    it("Deve retornar 404 se a entidade não for encontrada para atualização", async () => {
        const response = await request
            .put(`/api/user/entities/999999`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send(mockBody);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Entidade não encontrada");
        expect(response.body).toHaveProperty("status", 404);
    });

    it("Deve retornar 400 se os body estiverem inválidos", async () => {
        const response = await request
            .put(`/api/user/entities/${ENTITY_ID}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send({ name: "" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("status", 400);
    });

});

describe("EntityRoutes DELETE /user/entities/:id integration Tests", () => {

    it("Deve permitir que um usuário autenticado exclua uma entidade específica", async () => {
        const response = await request
            .delete(`/api/user/entities/${ENTITY_ID}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Entidade deletada com sucesso");
    });

    it("Deve retornar 404 se a entidade não for encontrada para exclusão", async () => {
        const response = await request
            .delete(`/api/user/entities/999999`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Entidade não encontrada");
        expect(response.body).toHaveProperty("status", 404);
    });

});

