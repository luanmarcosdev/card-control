import supertest from "supertest";
import app from "../../../server.js";

const request = supertest(app);

const TEST_USER_EMAIL = "user@example.com";
const TEST_USER_PASSWORD = "string";
let ACCESS_TOKEN;
let ENTITY_ID;
let EXPENSE_ID;

beforeAll(async () => {
    const loginResponse = await request.post("/api/auth/login").send({
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD
    });
    ACCESS_TOKEN = loginResponse.body.accessToken;
});

// Tests de integração para rotas de entidade

describe("EntityRoutes GET /user/entities 404 integration Tests", () => {
    
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

// Tests de integração para rotas de gastos de entidade

describe("EntityExpenseRoutes GET /user/expenses 404 integration Tests", () => {
    it("Deve retornar 404 se o usuário não possuir gastos cadastrados", async () => {
        const response = await request
            .get("/api/user/expenses")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("status", 404);
    });
});

describe("EntityExpenseRoutes GET /user/entities/:entityid/expenses 404 integration Tests", () => {

    it("Deve retornar 404 se a entidade não possuir gastos cadastrados", async () => {
        const response = await request
            .get(`/api/user/entities/${ENTITY_ID}/expenses`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("status", 404);
    });

});

describe("EntityExpenseRoutes POST /user/entities/:entityid/expenses integration Tests", () => {

    const mockExpense = {
        expenseCategoryId: 1,
        description: "string",
        amount: 100,
        date: "2025-01-01"
    };

    it("Deve permitir que um usuário autenticado crie um novo gasto para uma entidade", async () => {
        const response = await request
            .post(`/api/user/entities/${ENTITY_ID}/expenses`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send(mockExpense);

        expect(response.status).toBe(201);
        expect(response.body.expense).toHaveProperty("id");
        expect(response.body.expense).toHaveProperty("description", mockExpense.description);

        EXPENSE_ID = response.body.expense.id;
    });

    it("Deve retornar 400 se o body estiver inválido", async () => {
        const response = await request
            .post(`/api/user/entities/${ENTITY_ID}/expenses`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("status", 400);
    });

    it("Deve retornar 400 se categoria de gasto for inválida", async () => {
        const response = await request
            .post(`/api/user/entities/${ENTITY_ID}/expenses`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send({
                expenseCategoryId: 9999,
                description: "string",
                amount: 100,
                date: "2025-01-01"
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("status", 400);
    });

    it("Deve retornar 403 se o usuário não for proprietário da entidade", async () => {
        const response = await request
            .post(`/api/user/entities/9999/expenses`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send(mockExpense);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Acesso negado à entidade");
        expect(response.body).toHaveProperty("status", 403);
    });

});

describe("EntityExpenseRoutes GET /user/entities/:entityid/expenses integration Tests", () => {

    it("Deve permitir que um usuário autenticado obtenha os gastos de uma entidade", async () => {
        const response = await request
            .get(`/api/user/entities/${ENTITY_ID}/expenses`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("Deve retornar 403 se o usuário não for proprietário da entidade", async () => {
        const response = await request
            .get(`/api/user/entities/9999/expenses`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Acesso negado à entidade");
        expect(response.body).toHaveProperty("status", 403);
    });

});

describe("EntityExpenseRoutes GET /user/entities/:entityid/expenses/:expenseid integration Tests", () => {

    it("Deve permitir que um usuário autenticado obtenha um gasto específico de uma entidade", async () => {
        const response = await request
            .get(`/api/user/entities/${ENTITY_ID}/expenses/${EXPENSE_ID}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", EXPENSE_ID);
        expect(response.body).toHaveProperty("entity_id", ENTITY_ID);
    });

    it("Deve retornar 404 se o gasto não for encontrado na entidade", async () => {
        const response = await request
            .get(`/api/user/entities/${ENTITY_ID}/expenses/999999`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Gasto não encontrado ou nao pertence ao usuario");
        expect(response.body).toHaveProperty("status", 404);
    });

    it("Deve retornar 403 se o usuário não for proprietário da entidade", async () => {
        const response = await request
            .get(`/api/user/entities/9999/expenses/${EXPENSE_ID}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Acesso negado à entidade");
        expect(response.body).toHaveProperty("status", 403);
    });

});

describe("EntityExpenseRoutes GET /user/expenses integration Tests", () => {

    it("Deve permitir que um usuário autenticado obtenha todos os seus gastos", async () => {
        const response = await request
            .get(`/api/user/expenses`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

});

describe("EntityExpenseRoutes PUT /user/entities/:entityid/expenses/:expenseid integration Tests", () => {

    const mockUpdatedExpense = {
        expenseCategoryId: 1,
        description: "Gasto Atualizado",
        amount: 200,
        date: "2025-02-01"
    };

    it("Deve permitir que um usuário autenticado atualize um gasto específico de uma entidade", async () => {
        const response = await request
            .put(`/api/user/entities/${ENTITY_ID}/expenses/${EXPENSE_ID}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send(mockUpdatedExpense);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Gasto da entidade atualizado com sucesso");
    });

    it("Deve retornar 400 se o gasto não for encontrado na entidade para atualização", async () => {
        const response = await request
            .put(`/api/user/entities/${ENTITY_ID}/expenses/999999`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send(mockUpdatedExpense);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Nenhum gasto encontrado para atualizar");
        expect(response.body).toHaveProperty("status", 400);
    });

    it("Deve retornar 403 se o usuário não for proprietário da entidade", async () => {
        const response = await request
            .put(`/api/user/entities/9999/expenses/${EXPENSE_ID}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send(mockUpdatedExpense);
            
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Acesso negado à entidade");
        expect(response.body).toHaveProperty("status", 403);
    });

    it("Deve retornar 400 se o body estiver inválido", async () => {
        const response = await request
            .put(`/api/user/entities/${ENTITY_ID}/expenses/${EXPENSE_ID}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("status", 400);
    });

});

describe("EntityExpenseRoutes DELETE /user/entities/:entityid/expenses/:expenseid integration Tests", () => {
    
    it("Deve permitir que um usuário autenticado exclua um gasto específico de uma entidade", async () => {
        const response = await request
            .delete(`/api/user/entities/${ENTITY_ID}/expenses/${EXPENSE_ID}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Gasto excluido com sucesso");
    });

    it("Deve retornar 400 se o gasto não for encontrado na entidade para exclusão", async () => {
        const response = await request
            .delete(`/api/user/entities/${ENTITY_ID}/expenses/999999`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Dados inválidos. Verifique e tente novamente");
        expect(response.body).toHaveProperty("status", 400);
    });

    it("Deve retornar 403 se o usuário não for proprietário da entidade", async () => {
        const response = await request
            .delete(`/api/user/entities/9999/expenses/${EXPENSE_ID}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Acesso negado à entidade");
        expect(response.body).toHaveProperty("status", 403);
    });

});

// Test para deletar a entidade criada

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
