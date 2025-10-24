import supertest from "supertest";
import app from "../../../server.js";
import ExpenseCategoryRepository from "../../../repository/ExpenseCategoryRepository.js";

const request = supertest(app);

const TEST_USER_EMAIL = "user@example.com";
const TEST_USER_PASSWORD = "string";
let ACCESS_TOKEN;
let CREATED_CATEGORY_ID;

beforeAll(async () => {
    const loginResponse = await request.post("/api/auth/login").send({
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD
    });
    ACCESS_TOKEN = loginResponse.body.accessToken;
});

describe("ExpenseCategoryRoutes GET /expenses-categories integration test", () => {

    it("Deve permitir que um usuário autenticado obtenha suas categorias de despesa", async () => {
        const response = await request
            .get("/api/expenses-categories")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

});

describe("ExpenseCategoryRoutes POST /expenses-categories integration test", () => {

    it("Deve permitir que um usuário autenticado crie uma nova categoria de despesa", async () => {
        const newCategory = {
            name: "Transporte"
        };

        const response = await request
            .post("/api/expenses-categories")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send(newCategory);

        expect(response.status).toBe(201);
        expect(response.body.expenseCategory).toHaveProperty("id");
        expect(response.body.expenseCategory.name).toBe(newCategory.name);
        CREATED_CATEGORY_ID = response.body.expenseCategory.id;
    });

    it("Deve retornar 400 ao tentar criar uma categoria de despesa sem nome", async () => {
        const response = await request
            .post("/api/expenses-categories")
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send({});

        expect(response.status).toBe(400);
    });

});

describe("ExpenseCategoryRoutes GET /expenses-categories/:id integration test", () => {

    it("Deve permitir que um usuário autenticado obtenha uma categoria de despesa pelo ID", async () => {
        const categoryId = 1;

        const response = await request
            .get(`/api/expenses-categories/${categoryId}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", categoryId);
    });

    it("Deve retornar 404 ao tentar obter uma categoria de despesa que não existe", async () => {
        const categoryId = 999;

        const response = await request
            .get(`/api/expenses-categories/${categoryId}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

        expect(response.status).toBe(404);
    });

});

describe("ExpenseCategoryRoutes PUT /expenses-categories/:id integration test", () => {

    it("Deve permitir que um usuário autenticado atualize uma categoria de despesa existente", async () => {
        const updatedCategory = {
            name: "Alimentação Atualizada"
        };

        const response = await request
            .put(`/api/expenses-categories/${CREATED_CATEGORY_ID}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send(updatedCategory);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Categoria de gasto atualizada com sucesso");
    });

    it("Deve retornar 404 ao tentar atualizar uma categoria de despesa que não existe", async () => {
        const categoryId = 999;
        const updatedCategory = {
            name: "Categoria Inexistente"
        };

        const response = await request
            .put(`/api/expenses-categories/${categoryId}`)
            .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
            .send(updatedCategory);

        expect(response.status).toBe(404);
    });

});

afterAll(async () => {
    if (CREATED_CATEGORY_ID) {
        await ExpenseCategoryRepository.delete(CREATED_CATEGORY_ID);
    }
});
