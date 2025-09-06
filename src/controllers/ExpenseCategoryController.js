import ExpenseCategoryRepository from "../repository/ExpenseCategoryRepository.js";
import NotFoundError from "../errors/NotFoundError.js";
import ExpenseCategoryService from "../services/ExpenseCategoryService.js";

class ExpenseCategoryController {

    static async getAll(req, res) {
        const categories = await ExpenseCategoryService.getAll();
        res.status(200).json(categories);
    }

    static async find(req, res) {
        const id = req.params.id;
        const category = await ExpenseCategoryService.find(id);
        res.status(200).json(category);
    }

    static async create(req, res) {
        const category = await ExpenseCategoryService.create(req.body);
        res.status(200).json(category);
    }

    static async update(req, res) {
        const id = req.params.id;
        const result = await ExpenseCategoryService.update(req.body, id);
        res.status(200).json(result);
    }

}

export default ExpenseCategoryController;