import supertest from "supertest";
import app from "../../../server.js";
import UserRepository from "../../../repository/UserRepository.js";

const request = supertest(app);

const TEST_USER_NAME = "Test User";
const TEST_USER_EMAIL = "newuser@example.com";
const TEST_USER_PASSWORD = "string";

describe("AuthRoutes /register integration test", () => {

    const mockUser = {
        name: TEST_USER_NAME,
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD
    };

    it("Deve permitir que um novo usuário se registre", async () => {
        const response = await request.post("/api/auth/register").send(mockUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Usuário criado com sucesso.");
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user).toHaveProperty("email", TEST_USER_EMAIL);
    });

    it("Deve retornar 400 se o email já estiver em uso", async () => {
        const response = await request.post("/api/auth/register").send(mockUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "E-mail já cadastrado");
    });

});

describe("AuthRoutes /login integration test", () => {

    it("Deve permitir que um usuário faça login", async () => {
        const response = await request.post("/api/auth/login").send({
            email: TEST_USER_EMAIL,
            password: TEST_USER_PASSWORD
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("accessToken");
    });

    it("Deve retornar 401 se as credenciais forem inválidas", async () => {
        const response = await request.post("/api/auth/login").send({
            email: TEST_USER_EMAIL,
            password: "wrongpassword"
        });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Credenciais inválidas");
    });

});

afterAll(async () => {
    await UserRepository.deleteByEmail(TEST_USER_EMAIL);
});
