import database from '../database/models/index.cjs';

class ExpenseCategoryRepository {

    static async getAll(user_id) {
        return database.ExpenseCategory.findAll({ where: { user_id } });
    }

    static async find(id, user_id) {
        return database.ExpenseCategory.findOne({ where: { id, user_id } });
    }

    static async create(name, user_id) {
        return database.ExpenseCategory.create({ name, user_id });
    }

    static async update(name, id, user_id) {
        return database.ExpenseCategory.update({ name }, {  where: { id, user_id } });
    }

}

export default ExpenseCategoryRepository;