import database from '../database/models/index.cjs';

class ExpenseController {

    static async getAll(req, res) {

        try {

            const results = await database.sequelize.query(`
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
                WHERE en.user_id = :userId`, 
                {
                    replacements: { userId: req.userId },
                    type: database.Sequelize.QueryTypes.SELECT
                }
            );

            if (results.length === 0) {
                return res.status(404).json({ message: "Usuário não possui gastos cadastredos"})
            }

            // console.dir(results, {depth: null});
            res.status(200).json(results);
            
        } catch (error) {
            console.log(error)
        }
        
    }

}

export default ExpenseController;