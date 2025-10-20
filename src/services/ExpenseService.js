import ExpenseRepository from '../repository/ExpenseRepository.js';
import EntityRepository from '../repository/EntityRepository.js';
import UserRepository from '../repository/UserRepository.js';
import ExpenseCategoryRepository from '../repository/ExpenseCategoryRepository.js';
import NotFoundError from '../errors/NotFoundError.js';
import ForbiddenError from '../errors/ForbiddenError.js';

class ExpenseService {

    static async #verifyEntityExists(entityId) {
        const entity = await EntityRepository.find(entityId);
        if (!entity) throw new NotFoundError("Entidade não encontrada, verifique e tente novamente");
    }

    static async #verifyUserExists(userId) {
        const user = await UserRepository.findOneByPk(userId);
        if (!user) throw new ForbiddenError("Usuário não possui permissão, faça o login novamente");
    }

    static async getAll(userId) {
        await this.#verifyUserExists(userId);
        const expenses = await ExpenseRepository.getAllExpenses(userId);
        if (expenses.length === 0) throw new NotFoundError("Usuário não possui gastos cadastrados");
        return expenses;
    }

    static async getAllEntityExpenses(entityId) {
        const expenses = await ExpenseRepository.getAllEntityExpenses(entityId);
        if(expenses.length === 0) throw new NotFoundError("Nenhum gasto cadastrado para a entidade");
        return expenses;
    }

    static async findEntityExpenses(expenseId, entityId) {
        const expenses = await ExpenseRepository.find(expenseId, entityId);
        if(!expenses) throw new NotFoundError("Gasto não encontrado ou nao pertence ao usuario");
        return expenses;
    }

    static async createEntityExpense(expenseData, entityId) {
        const { expenseCategoryId, description, amount, date } = expenseData;

        const category = await ExpenseCategoryRepository.find(expenseCategoryId);
        if (!category) throw new NotFoundError("Categoria de gasto não encontrada, verifique e tente novamente");
        
        const data = {
            entity_id: entityId,
            expense_category_id: expenseCategoryId,
            description: description,
            amount: amount,
            date: date
        };

        await ExpenseRepository.create(data);
        return { message: "Gasto cadastrado com sucesso" };
    }

    static async updateEntityExpense(expenseData, expenseId, entityId) {
        const { expenseCategoryId, description, amount, date } = expenseData;

        const category = await ExpenseCategoryRepository.find(expenseCategoryId);
        if (!category) throw new NotFoundError("Categoria de gasto não encontrada, verifique e tente novamente");

        const data = 
        {
            expense_category_id: expenseCategoryId,
            description: description,
            amount: amount,
            date: date
        };

        const updatedExpense = await ExpenseRepository.update(data, expenseId, entityId)
        if (updatedExpense[0] === 0) throw new NotFoundError("Nenhum gasto encontrado para atualizar");
        return { message: "Gasto da entidade atualizado com sucesso" };
    }

    static async deleteEntityExpense(expenseId, entityId) {
        const expense = await ExpenseRepository.find(expenseId, entityId);
        if (!expense) throw new NotFoundError("Dados inválidos. Verifique e tente novamente");
    
        const deletedExpense = await ExpenseRepository.delete(expenseId, entityId);
        if (deletedExpense === 0) throw new NotFoundError("Nenhum gasto encontrado para deletar");

        return { message: "Gasto excluido com sucesso" };
    }


}

export default ExpenseService