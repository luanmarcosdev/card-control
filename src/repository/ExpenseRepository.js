import database from '../database/models/index.cjs';

class ExpenseRepository {

    static async getAllEntityExpenses(entity_id) {
        return database.Expense.findAll({ where: { entity_id }, include:
            [
                {
                    model: database.ExpenseCategory,
                    attributes: ['name']
                },
                {
                    model: database.Entity,
                    attributes: ['name']
                }
            ]
        });
    }

    static async find(id, entity_id) {
        return database.Expense.findOne({ where: { id, entity_id }, include: 
            [
                {
                    model: database.ExpenseCategory,
                    attributes: ['name']
                },
                {
                    model: database.Entity,
                    attributes: ['name']
                }
            ]
        });
    }

    static async create(data) {
        return database.Expense.create(data);
    }

    static async update(data, id, entity_id) {
        return database.Expense.update( data, {  where: { id, entity_id } });
    }

    static async delete(id, entity_id) {
        return database.Expense.destroy({ where: { id, entity_id } });
    }

}

export default ExpenseRepository;