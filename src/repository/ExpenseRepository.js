import database from '../database/models/index.cjs';

class ExpenseRepository {

    static async getAllExpenses(userId, offset, limit) {
        return  database.sequelize.query(`
            SELECT ex.id, 
                en.name AS entity_name, 
                ec.name AS expense_category, 
                ex.description, 
                ex.amount, 
                ex.date, 
                ex.createdAt, 
                ex.updatedAt 
            FROM expenses ex
            JOIN entities en ON ex.entity_id = en.id
            JOIN expense_categories ec ON ec.id = ex.expense_category_id
            WHERE en.user_id = :userId
            ORDER BY ex.date DESC
            LIMIT :limit OFFSET :offset;
        `, 
            {
                replacements: { userId, limit, offset },
                type: database.Sequelize.QueryTypes.SELECT
            }
        );
    }

    static async getTotalExpensesCount(userId) {
        const result = await database.sequelize.query(`
            SELECT COUNT(*) AS total 
            FROM expenses ex
            JOIN entities en ON ex.entity_id = en.id
            WHERE en.user_id = :userId;
        `, 
        {
            replacements: { userId },
            type: database.Sequelize.QueryTypes.SELECT
        });
        return result[0].total;
    }

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