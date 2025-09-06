import ExpenseRepository from '../repository/ExpenseRepository.js';
import ExpenseCategoryRepository from '../repository/ExpenseCategoryRepository.js';
import NotFoundError from '../errors/NotFoundError.js';

class EntityExpenseController {

    static async getAll(req, res, next) {
        try {
            const expenses = await ExpenseRepository.getAllEntityExpenses(req.params.entityid);
            if(expenses.length === 0) throw new NotFoundError("Nenhum gasto cadastrado para a entidade");
            res.status(200).json(expenses);
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const expense = await ExpenseRepository.find(req.params.expenseId, req.params.entityid);
            if(!expense) throw new NotFoundError("Gasto não encontrado ou nao pertence ao usuario");
            res.status(200).json(expense);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const { expenseCategoryId, description, amount, date } = req.body;

            const category = await ExpenseCategoryRepository.find(expenseCategoryId);
            if (!category) throw new NotFoundError("Categoria de gasto não encontrada, verifique e tente novamente");
            
            const data = {
                entity_id: req.entityId,
                expense_category_id: expenseCategoryId,
                description: description,
                amount: amount,
                date: date
            };

            const expense = await ExpenseRepository.create(data);

            res.status(200).json({
                message: "Gasto cadastrado com sucesso",
                expense: {
                    entity: req.entityName,
                    caregory: category.name,
                    description: data.description,
                    amount: data.amount,
                    date: data.date,
                    createdAt: data.createdAt
                } 
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { expenseCategoryId, description, amount, date } = req.body;

            const category = await ExpenseCategoryRepository.find(expenseCategoryId);

            if (!category) throw new NotFoundError("Categoria de gasto não encontrada, verifique e tente novamente");

            const data = 
            {
                expense_category_id: expenseCategoryId,
                description: description,
                amount: amount,
                date: date
            };

            const updatedExpense = await ExpenseRepository.update(data, req.params.expenseId, req.entityId)

            if (updatedExpense[0] === 0) throw new NotFoundError("Nenhum gasto encontrado para atualizar");

            res.status(200).json({ message: "Gasto da entidade atualizado com sucesso" });

        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const expenseId = req.params.expenseId;
            const entityId = req.entityId;

            const expense = await ExpenseRepository.find(expenseId, entityId);
            
            if (!expense) throw new NotFoundError("Dados inválidos. Verifique e tente novamente");
            
            const deletedExpense = await ExpenseRepository.delete(expenseId, entityId);

            if (deletedExpense === 0) throw new NotFoundError("Nenhum gasto encontrado para deletar");

            return res.status(200).json({ message: "Gasto excluido com sucesso" });
        } catch (error) {
            next(error);
        }

    }

}

export default EntityExpenseController;