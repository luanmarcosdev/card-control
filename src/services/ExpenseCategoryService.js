import ExpenseCategoryRepository from "../repository/ExpenseCategoryRepository.js";
import UserRepository from "../repository/UserRepository.js";
import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";

class ExpenseCategoryService {

    static async #verifyUserExists(userId) {
        const user = await UserRepository.findOneByPk(userId);
        if (!user) throw new BadRequestError("Usuário não encontrado. Verifique e tente novamente");
    }

    static async getAll(user_id) {
        await this.#verifyUserExists(user_id);
        const categories = await ExpenseCategoryRepository.getAll(user_id);
        if (categories.length === 0) throw new NotFoundError("Nenhuma categoria de gasto cadastrada para o usuário");
        return categories;
    }

    static async find(id, userId) {
        await this.#verifyUserExists(userId);
        const category = await ExpenseCategoryRepository.find(id, userId);
        if(!category) throw new NotFoundError('Categoria de gasto não encontrada');
        return category;
    }

    static async create(categoryData, userId) {
        if (categoryData.name === undefined) {
            throw new BadRequestError("nome é obrigatório");
        }
        await this.#verifyUserExists(userId);
        const { name } = categoryData;
        const category = await ExpenseCategoryRepository.create(name, userId);
        return {
            message: "Categoria de gasto criada com sucesso",
            expenseCategory: category
        };
    }

    static async update(categoryData, id, userId) {
        await this.#verifyUserExists(userId);
        
        if (categoryData.name === undefined) {
            throw new BadRequestError("nome é obrigatório");
        }
        const { name } = categoryData;
        
        const updatedCategory = await ExpenseCategoryRepository.update(name, id, userId);
        if (updatedCategory[0] === 0) throw new NotFoundError('Categoria de gasto não encontrada para atualização');
        
        return { message: "Categoria de gasto atualizada com sucesso" };
    }

}

export default ExpenseCategoryService;