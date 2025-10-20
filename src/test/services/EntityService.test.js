import EntityService from "../../services/EntityService";

let entityIdCreated;

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

    it("Deve lançar ForbiddenError se o usuário não existir", async () => {
        const userId = 8888;
        await expect(EntityService.getAll(userId)).rejects.toThrow("Usuário não possui permissão, faça o login novamente");
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
        entityIdCreated = response.entity.entity_id;
        expect(response).toHaveProperty("message", "Entidade criada com sucesso");
        expect(response.entity).toHaveProperty("name", entityData.name);
    });
    
    it("Deve lançar BadRequestError se os dados forem inválidos", async () => {
        const entityData = {};
        const userId = 10;
        await expect(EntityService.create(entityData, userId)).rejects.toThrow("nome e descrição são obrigatórios");
    });

    it("Deve lançar ForbiddenError se o usuário não existir", async () => {
        const entityData = {
            name: "Entidade Teste",
            description: "Descrição da entidade teste"
        };
        const userId = 9999;
        await expect(EntityService.create(entityData, userId)).rejects.toThrow("Usuário não possui permissão, faça o login novamente");
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

    it("Deve lançar ForbiddenError se o usuário não existir", async () => {
        const entityId = 1;
        const userId = 8888;
        await expect(EntityService.find(entityId, userId)).rejects.toThrow("Usuário não possui permissão, faça o login novamente");
    });

});

describe("Testando a EntityService.update", () => {
    
    it("Deve lançar BadRequestError se os dados forem inválidos", async () => {
        const entityData = {};
        const userId = 10;
        await expect(EntityService.update(entityData, 1, userId)).rejects.toThrow("nome e descrição são obrigatórios");
    });

    it("Deve lançar NotFoundError se a entidade não existir", async () => {
        const entityData = {
            name: "Entidade Atualizada",
            description: "Descrição da entidade atualizada"
        };
        const userId = 10;
        await expect(EntityService.update(entityData, 9999, userId)).rejects.toThrow("Entidade não encontrada");
    });

    it("Deve lançar ForbiddenError se o usuário não existir", async () => {
        const entityData = {
            name: "Entidade Atualizada",
            description: "Descrição da entidade atualizada"
        };
        const userId = 8888;
        await expect(EntityService.update(entityData, 1, userId)).rejects.toThrow("Usuário não possui permissão, faça o login novamente");
    });

    it("Deve atualizar a entidade com sucesso", async () => {
        const entityData = {
            name: "Entidade Atualizada",
            description: "Descrição da entidade atualizada"
        };
        const userId = 10;
        const entityId = 37;
        const response = await EntityService.update(entityData, entityId, userId);
        expect(response).toHaveProperty("message", "Entidade atualizada com sucesso");
    });

});

describe("Testando a EntityService.delete", () => {

    it("Deve lançar NotFoundError se a entidade ou usuario não existir", async () => {
        const userId = 9999;
        const entityId = 9999;
        await expect(EntityService.delete(entityId, userId)).rejects.toThrow("Entidade não encontrada");
    });

    it("Deve deletar a entidade com sucesso", async () => {
        const userId = 10;
        const entityId = entityIdCreated;
        const response = await EntityService.delete(entityId, userId);
        expect(response).toHaveProperty("message", "Entidade deletada com sucesso");
    });

});