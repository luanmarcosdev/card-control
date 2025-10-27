import ExpenseService from '../services/ExpenseService.js';

class ExpenseController {

    static async getAll(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            
            const expenses = await ExpenseService.getAll(req.userId, page, limit);
            res.status(200).json(expenses);
        } catch (error) {
            next(error);
        }
    }

}

export default ExpenseController;