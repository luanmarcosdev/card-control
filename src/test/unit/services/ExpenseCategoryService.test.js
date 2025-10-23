import ExpenseCategoryService from "../../../services/ExpenseCategoryService";

let categoryIdCreated;

describe("Testando ExpenseCategoryService.getAll", () => {
    
    it("Deve retornar todas as categorias de gasto do usuário", async () => {
        const userId = 1;
        const categories = await ExpenseCategoryService.getAll(userId);
        expect(categories).toBeInstanceOf(Array);
    });

    it("Deve lançar NotFoundError se o usuário não possuir categorias de gasto", async () => {
        const userId = 10;
        await expect(ExpenseCategoryService.getAll(userId)).rejects.toThrow("Nenhuma categoria de gasto cadastrada para o usuário");
    });

    it("Deve lançar BadRequestError se o usuário não existir", async () => {
        const userId = 8888;
        await expect(ExpenseCategoryService.getAll(userId)).rejects.toThrow("Usuário não encontrado. Verifique e tente novamente");
    });

});

describe("Testando ExpenseCategoryService.find", () => {

    it("Deve retornar a categoria de gasto pelo ID", async () => {
        const userId = 1;
        const categoryId = 1;
        const category = await ExpenseCategoryService.find(categoryId, userId);
        expect(category).toHaveProperty("id", categoryId);
    });

    it("Deve lançar NotFoundError se a categoria de gasto não existir", async () => {
        const userId = 1;
        const categoryId = 9999;
        await expect(ExpenseCategoryService.find(categoryId, userId)).rejects.toThrow("Categoria de gasto não encontrada");
    });

    it("Deve lançar BadRequestError se o usuário não existir", async () => {
        const userId = 8888;
        const categoryId = 1;
        await expect(ExpenseCategoryService.find(categoryId, userId)).rejects.toThrow("Usuário não encontrado. Verifique e tente novamente");
    });
    
});

describe("Testando ExpenseCategoryService.create", () => {

    it("Deve criar uma nova categoria de gasto", async () => {
        const userId = 1;
        const categoryData = {
            name: "Categoria Teste"
        };
        const response = await ExpenseCategoryService.create(categoryData, userId);
        categoryIdCreated = response.expenseCategory.id;
        expect(response).toHaveProperty("message", "Categoria de gasto criada com sucesso");
        expect(response.expenseCategory).toHaveProperty("name", categoryData.name);
    });

    it("Deve lançar BadRequestError se os dados forem inválidos", async () => {
        const categoryData = {};
        const userId = 1;
        await expect(ExpenseCategoryService.create(categoryData, userId)).rejects.toThrow("nome é obrigatório");
    });

    it("Deve lançar BadRequestError se o usuário não existir", async () => {
        const categoryData = {
            name: "Categoria Teste"
        };
        const userId = 9999;
        await expect(ExpenseCategoryService.create(categoryData, userId)).rejects.toThrow("Usuário não encontrado. Verifique e tente novamente");
    });

});

describe("Testando ExpenseCategoryService.update", () => {

    it("Deve atualizar uma categoria de gasto", async () => {
        const userId = 1;
        const categoryData = {
            name: "Categoria Teste Atualizada"
        };
        const response = await ExpenseCategoryService.update(categoryData, categoryIdCreated, userId);
        expect(response).toHaveProperty("message", "Categoria de gasto atualizada com sucesso");
    });

    it("Deve lançar NotFoundError se a categoria de gasto não existir para atualização", async () => {
        const userId = 1;
        const categoryData = {
            name: "Categoria Teste Atualizada"
        };
        const invalidCategoryId = 9999;
        await expect(ExpenseCategoryService.update(categoryData, invalidCategoryId, userId)).rejects.toThrow("Categoria de gasto não encontrada para atualização");
    });
    
    it("Deve lançar BadRequestError se os dados forem inválidos", async () => {
        const userId = 1;
        const categoryData = {};
        await expect(ExpenseCategoryService.update(categoryData, categoryIdCreated, userId)).rejects.toThrow("nome é obrigatório");
    });

});