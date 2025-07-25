import { where } from 'sequelize';
import database from '../database/models/index.cjs';

class ExpenseCategoryController {

    static async getAll(req, res) {

        const data = await database.ExpenseCategory.findAll();

        res.status(200).json(data);
    }

    static async find(req, res) {

        const data = await database.ExpenseCategory.findOne({ where: {id: req.params.id} });
        
        if(!data) {
            res.status(404).json({ message: "Categoria de gasto não encontrada" });
            return;
        }
        
        res.status(200).json(data);
    }

    static async create(req, res) {

        const { name } = req.body;
        
        const data = await database.ExpenseCategory.create({
            name: name
        });
        
        res.status(200).json({
            message: "Categoria de gasto criada com sucesso",
            expenseCategory: data
        });
    }

    static async update(req, res) {

        const { name } = req.body;

        const data = await database.ExpenseCategory.update(
            {
                name: name
            },
            {
                where: { id: req.params.id }
            }
        )

        if (data[0] === 0) {
            throw new Error('Nao foi possivel atualizar');
        }

        const updatedCategory = await database.ExpenseCategory.findOne({ where: { id: req.params.id }} );

        res.status(200).json({
            message: "Categoria de gasto atualizada com sucesso",
            expenseCategory: updatedCategory
        })

    }

}

export default ExpenseCategoryController;