import ExpenseCategoryService from "../services/ExpenseCategoryService.js";

class ExpenseCategoryController {

    static async getAll(req, res, next) {
        try {
            const categories = await ExpenseCategoryService.getAll();
            res.status(200).json(categories);
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const id = req.params.id;
            const category = await ExpenseCategoryService.find(id);
            res.status(200).json(category);
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const category = await ExpenseCategoryService.create(req.body);
            res.status(201).json(category);
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const id = req.params.id;
            const result = await ExpenseCategoryService.update(req.body, id);
            res.status(200).json(result);
        } catch(error) {
            next(error);
        }
    }

}

export default ExpenseCategoryController;