import ExpenseCategoryRepository from "../repository/ExpenseCategoryRepository.js";
import NotFoundError from "../errors/NotFoundError.js";

class ExpenseCategoryController {

    static async getAll(req, res) {
        const categories = await ExpenseCategoryRepository.getAll();

        if (categories.length === 0) throw new NotFoundError("Nenhuma categoria de gasto cadastrada");

        res.status(200).json(categories);
    }

    static async find(req, res) {

        const category = await ExpenseCategoryRepository.find(req.params.id);
        
        if(!category) throw new NotFoundError('Categoria de gasto não encontrada');
        
        res.status(200).json(category);
    }

    static async create(req, res) {

        const { name } = req.body;

        const category = await ExpenseCategoryRepository.create(name)
        
        res.status(200).json({
            message: "Categoria de gasto criada com sucesso",
            expenseCategory: category
        });
    }

    static async update(req, res) {

        const { name } = req.body;

        const updatedCategory = await ExpenseCategoryRepository.update(name, req.params.id);

        if (updatedCategory[0] === 0) throw new Error('Não foi possivel atualizar');

        res.status(200).json({
            message: "Categoria de gasto atualizada com sucesso"
        })

    }

}

export default ExpenseCategoryController;