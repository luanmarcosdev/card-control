import ExpenseService from '../../services/ExpenseService';

let expenseIdCreated;

describe('Testando ExpenseService.getAll', () => {

    it('Deve lançar NotFoundError quando não houver gastos', async () => {
        const userId = 1;
        await expect(ExpenseService.getAll(userId)).rejects.toThrow("Usuário não possui gastos cadastrados");
    });

    it('Deve retornar uma lista de gastos', async () => {
        const userId = 10;
        const expenses = await ExpenseService.getAll(userId);
        expect(expenses).toBeInstanceOf(Array);
    });

    it('Deve lançar ForbiddenError se o usuário não existir', async () => {
        const userId = 9999;
        await expect(ExpenseService.getAll(userId)).rejects.toThrow("Usuário não possui permissão, faça o login novamente");
    });

});

describe('Testando ExpenseService.getAllEntityExpenses', () => {

    it('Deve lançar NotFoundError quando não houver gastos para a entidade', async () => {
        const entityId = 3;
        await expect(ExpenseService.getAllEntityExpenses(entityId)).rejects.toThrow("Nenhum gasto cadastrado para a entidade");
    });

    it('Deve retornar uma lista de gastos para a entidade', async () => {
        const entityId = 2;
        const expenses = await ExpenseService.getAllEntityExpenses(entityId);
        expect(expenses).toBeInstanceOf(Array);
    });

    it('Deve lançar BadRequestError se a entidade não existir', async () => {
        const entityId = 999;
        await expect(ExpenseService.getAllEntityExpenses(entityId)).rejects.toThrow("Entidade não encontrada, verifique e tente novamente");
    });

});

describe('Testando ExpenseService.findEntityExpenses', () => {

    it('Deve lançar BadRequestError se a entidade não existir', async () => {
        const entityId = 999;
        await expect(ExpenseService.getAllEntityExpenses(entityId)).rejects.toThrow("Entidade não encontrada, verifique e tente novamente");
    });

    it('Deve lançar NotFoundError se o gasto não existir ou não pertencer à entidade', async () => {
        const expenseId = 1;
        const entityId = 20;
        await expect(ExpenseService.findEntityExpenses(expenseId, entityId)).rejects.toThrow("Gasto não encontrado ou nao pertence ao usuario");
    });

    it('Deve retornar o gasto se existir e pertencer à entidade', async () => {
        const expenseId = 1;
        const entityId = 1;
        const expense = await ExpenseService.findEntityExpenses(expenseId, entityId);
        expect(expense).toBeDefined();
    });

});

describe('Testando ExpenseService.createEntityExpense', () => {

    it('Deve lançar BadRequestError se a entidade não existir', async () => {
        const entityId = 999;
        const userId = 1;
        const expenseData = {
            expenseCategoryId: 1,
            description: "Teste",
            amount: 111,
            date: "2024-01-01"
        };
        await expect(ExpenseService.createEntityExpense(expenseData, entityId, userId)).rejects.toThrow("Entidade não encontrada, verifique e tente novamente");
    });

    it('Deve lançar BadRequestError se a categoria de gasto não existir', async () => {
        const entityId = 1;
        const userId = 1;
        const expenseData = {
            expenseCategoryId: 999,
            description: "Teste",
            amount: 111,
            date: "2024-01-01"
        };
        await expect(ExpenseService.createEntityExpense(expenseData, entityId, userId)).rejects.toThrow("Categoria de gasto não encontrada, verifique e tente novamente");
    });

    it('Deve lançar BadRequestError se os dados estiverem incompletos', async () => {
        const entityId = 1;
        const userId = 1;
        const expenseData = {};
        await expect(ExpenseService.createEntityExpense(expenseData, entityId, userId)).rejects.toThrow("expenseCategoryId, description, amount e date são obrigatórios");
    });

    it('Deve criar um gasto com sucesso', async () => {
        const entityId = 1;
        const userId = 1;
        const expenseData = {
            expenseCategoryId: 1,
            description: "Teste",
            amount: 111,
            date: "2024-01-01"
        };
        const response = await ExpenseService.createEntityExpense(expenseData, entityId, userId);
        expenseIdCreated = response.expense.id;
        expect(response).toEqual({ message: "Gasto cadastrado com sucesso", expense: response.expense });
    });

});

describe('Testando ExpenseService.updateEntityExpense', () => {

    it('Deve lançar BadRequestError se a entidade não existir', async () => {
        const entityId = 999;
        const userId = 1;
        const expenseId = 1;
        const expenseData = {
            expenseCategoryId: 1,
            description: "Teste",
            amount: 111,
            date: "2024-01-01"
        };
        await expect(ExpenseService.updateEntityExpense(expenseData, expenseId, entityId, userId)).rejects.toThrow("Entidade não encontrada, verifique e tente novamente");
    });

    it('Deve lançar BadRequestError se os dados estiverem incompletos', async () => {
        const entityId = 1;
        const userId = 1;
        const expenseData = {};
        await expect(ExpenseService.createEntityExpense(expenseData, entityId, userId)).rejects.toThrow("expenseCategoryId, description, amount e date são obrigatórios");
    });

    it('Deve lançar BadRequestError se a categoria de gasto não existir', async () => {
        const entityId = 1;
        const userId = 1;
        const expenseData = {
            expenseCategoryId: 999,
            description: "Teste",
            amount: 111,
            date: "2024-01-01"
        };
        await expect(ExpenseService.createEntityExpense(expenseData, entityId, userId)).rejects.toThrow("Categoria de gasto não encontrada, verifique e tente novamente");
    });

    it('Deve lançar BadRequestError se nenhum gasto for encontrado para atualizar', async () => {
        const entityId = 1;
        const userId = 1;
        const expenseId = 9999;
        const expenseData = {
            expenseCategoryId: 1,
            description: "Teste",
            amount: 111,
            date: "2024-01-01"
        };
        await expect(ExpenseService.updateEntityExpense(expenseData, expenseId, entityId, userId)).rejects.toThrow("Nenhum gasto encontrado para atualizar");
    });

    it('Deve atualizar um gasto com sucesso', async () => {
        const entityId = 1;
        const userId = 1;
        const expenseId = 1;
        const expenseData = {
            expenseCategoryId: 1,
            description: "Tênis para academia teste",
            amount: 399.90,
            date: "2024-02-02"
        };
        const response = await ExpenseService.updateEntityExpense(expenseData, expenseId, entityId, userId);
        expect(response).toEqual({ message: "Gasto da entidade atualizado com sucesso"});
    });

});

describe('Testando ExpenseService.deleteEntityExpense', () => {

    it('Deve lançar BadRequestError se a entidade ou o gasto não existir', async () => {
        const entityId = 999;
        const expenseId = 999;
        await expect(ExpenseService.deleteEntityExpense(expenseId, entityId)).rejects.toThrow("Dados inválidos. Verifique e tente novamente");
    });

    it('Deve excluir um gasto com sucesso', async () => {
        const entityId = 1;
        const response = await ExpenseService.deleteEntityExpense(expenseIdCreated, entityId);
        expect(response).toEqual({ message: "Gasto excluido com sucesso" });
    });
    
});