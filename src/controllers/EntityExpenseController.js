import ExpenseService from '../services/ExpenseService.js';

class EntityExpenseController {

    static async getAll(req, res, next) {
        try {
            const expenses = await ExpenseService.getAllEntityExpenses(req.params.entityid);
            return res.status(200).json(expenses);
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const expenses = await ExpenseService.findEntityExpenses(req.params.expenseId, req.params.entityid);
            return res.status(200).json(expenses);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const expense = await ExpenseService.createEntityExpense(req.body, req.entityId);
            return res.status(201).json(expense);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const result = await ExpenseService.updateEntityExpense(req.body, req.params.expenseId, req.entityId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {

            const result = await ExpenseService.deleteEntityExpense(req.params.expenseId, req.entityId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }

    }

}

export default EntityExpenseController;