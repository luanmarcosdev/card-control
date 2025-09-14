import ExpenseService from '../services/ExpenseService.js';

class ExpenseController {

    static async getAll(req, res, next) {
        try {
            const expenses = await ExpenseService.getAll(req.userId);
            res.status(200).json(expenses);            
        } catch (error) {
            next(error);
        }
    }

}

export default ExpenseController;