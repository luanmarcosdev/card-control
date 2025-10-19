import EntityService from "../../services/EntityService";

describe("Testando a EntityService.getAll", () => {
    
    it("Deve retornar todos os registros", async () => {
        const userId = 10;
        const response = await EntityService.getAll(userId);
        expect(response).toBeInstanceOf(Array);
    });

    it("Deve lançar NotFoundError se não houver entidades", async () => {
        const userId = 14;
        await expect(EntityService.getAll(userId)).rejects.toThrow("Nenhuma entidade cadastrada para o usuário");
    });

    it("Deve lançar NotFoundError se o usuário não existir", async () => {
        const userId = 8888;
        await expect(EntityService.getAll(userId)).rejects.toThrow("Usuário não encontrado");
    });

});

describe("Testando a EntityService.create", () => {
    
    it("Deve criar uma nova entidade", async () => {
        const userId = 10;
        const entityData = {
            name: "Nova Entidade",
            description: "Descrição da nova entidade"
        };
        const response = await EntityService.create(entityData, userId);
        expect(response).toHaveProperty("message", "Entidade criada com sucesso");
        expect(response.entity).toHaveProperty("name", entityData.name);
    });
    
    it("Deve lançar BadRequestError se os dados forem inválidos", async () => {
        const entityData = {};
        const userId = 10;
        await expect(EntityService.create(entityData, userId)).rejects.toThrow("nome e descrição são obrigatórios");
    });

    it("Deve lançar NotFoundError se o usuário não existir", async () => {
        const entityData = {
            name: "Entidade Teste",
            description: "Descrição da entidade teste"
        };
        const userId = 9999;
        await expect(EntityService.create(entityData, userId)).rejects.toThrow("Usuário não encontrado");
    });

});

describe("Testando a EntityService.find", () => {
    
    it("Deve retornar a entidade pelo ID", async () => {
        const entityId = 1;
        const userId = 10;
        const response = await EntityService.find(entityId, userId);
        expect(response).toHaveProperty("id", entityId);
    });

    it("Deve lançar NotFoundError se a entidade não existir", async () => {
        const entityId = 9999;
        const userId = 10;
        await expect(EntityService.find(entityId, userId)).rejects.toThrow("Entidade não encontrada");
    });

    it("Deve lançar NotFoundError se o usuário não existir", async () => {
        const entityId = 1;
        const userId = 8888;
        await expect(EntityService.find(entityId, userId)).rejects.toThrow("Usuário não encontrado");
    });

});

// TO DO: Testar EntityService.update e EntityService.delete