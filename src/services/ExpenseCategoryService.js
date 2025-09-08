import ExpenseCategoryRepository from "../repository/ExpenseCategoryRepository.js";
import NotFoundError from "../errors/NotFoundError.js";

class ExpenseCategoryService {

    static async getAll() {
        const categories = await ExpenseCategoryRepository.getAll();
        if (categories.length === 0) throw new NotFoundError("Nenhuma categoria de gasto cadastrada");
        return categories;
    }

    static async find(id) {
        const category = await ExpenseCategoryRepository.find(id);
        if(!category) throw new NotFoundError('Categoria de gasto não encontrada');
        return category;
    }

    static async create(categoryData) {
        const { name } = categoryData;
        const category = await ExpenseCategoryRepository.create(name)
        return {
            message: "Categoria de gasto criada com sucesso",
            expenseCategory: category
        };
    }

    static async update(categoryData, id) {
        const { name } = categoryData;
        const updatedCategory = await ExpenseCategoryRepository.update(name, id);
        if (updatedCategory[0] === 0) throw new NotFoundError('Categoria de gasto não encontrada para atualização');
        return { message: "Categoria de gasto atualizada com sucesso" };
    }

}

export default ExpenseCategoryService;