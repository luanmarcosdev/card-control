import database from '../database/models/index.cjs';

class ExpenseCategoryRepository {

    static async getAll() {
        return database.ExpenseCategory.findAll();
    }

    static async find(id) {
        return database.ExpenseCategory.findOne({ where: { id } });
    }

    static async create(name) {
        return database.ExpenseCategory.create({ name });
    }

    static async update(name, id) {
        return database.ExpenseCategory.update({ name }, {  where: { id } });
    }

}

export default ExpenseCategoryRepository;