import ExpenseService from '../../services/ExpenseService';

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

// TO DO: Adicionar mais testes para as outras funções do ExpenseService