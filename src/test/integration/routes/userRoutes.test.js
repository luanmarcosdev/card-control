import supertest from "supertest";
import app from "../../../server.js";

const request = supertest(app);

const TEST_USER_EMAIL = "user@example.com";
const TEST_USER_PASSWORD = "string";

let ACCESS_TOKEN;

try {
    const loginResponse = await request.post("/api/auth/login").send({
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD
    });

    ACCESS_TOKEN = loginResponse.body.accessToken;
} catch (error) {
    console.error("Erro ao obter o token de acesso:", error);
}

describe("UserRoutes GET /user integration test", () => {

    it("Deve permitir que um usuário autenticado obtenha seus dados", async () => {
        const response = await request
            .get("/api/user")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("email", TEST_USER_EMAIL)
        expect(response.body).toHaveProperty("id", 1);
    });

    it("Deve retornar 401 se o token de acesso for inválido", async () => {
        const response = await request
            .get("/api/user")
            .set("Authorization", `Bearer invalidtoken`);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Token inválido ou expirado");
        expect(response.body).toHaveProperty("status", 401);
    });

    it("Deve retornar 401 se o token não for fornecido", async () => {
        const response = await request
            .get("/api/user")
            .set("Authorization", "");

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Token não fornecido");
        expect(response.body).toHaveProperty("status", 401);
    });

    it("Deve retornar 401 se o token estiver mal formatado", async () => {
        const response = await request
            .get("/api/user")
            .set("Authorization", `Bearer-invalidtoken`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Token mal formatado");
        expect(response.body).toHaveProperty("status", 401);
    });

});

describe("UserRoutes PUT /user integration test", () => {

    const UPDATED_USER_NAME = "Updated User";

    it("Deve permitir que um usuário autenticado atualize seus dados", async () => {
        const response = await request
            .put("/api/user")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send({ name: UPDATED_USER_NAME });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Usuário atualizado com sucesso");
    });

    it("Deve retornar 400 se o campo 'name' não for fornecido", async () => {
        const response = await request
            .put("/api/user")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "O campo 'name' é obrigatório");
        expect(response.body).toHaveProperty("status", 400);
    });

});