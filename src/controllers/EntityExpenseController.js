import { where } from 'sequelize';
import database from '../database/models/index.cjs';

class EntityExpenseController {

    static async getAll(req, res) {
        
        const data = await database.Expense.findAll({
            where: {
                entity_id: req.params.entityid,
            },
            include: [
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
        
        if(data.length === 0) {
            res.status(404).json({ message: "Nenhum gasto cadastrado para a entidade" })
        }

        // formata o sequelize object para retornar o json
        const formatted = data.map(expense => {
            const plainExpense = expense.get({ plain: true });
            plainExpense.category = plainExpense.ExpenseCategory?.name || null;
            plainExpense.entity = plainExpense.Entity?.name || null;
            delete plainExpense.ExpenseCategory;
            delete plainExpense.Entity;
            return plainExpense;
        });

        res.status(200).json(formatted);
    }

    static async find(req, res) {

        const data = await database.Expense.findOne({
            where: { 
                id: req.params.expenseId,
                entity_id: req.params.entityid
            },
            include: [
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
        
        if(!data) {
            res.status(404).json({ message: "Gasto não encontrado ou nao pertence ao usuario" })
        }

        // formata o sequelize object para retornar o json
        function formatExpense(expense) {
            const plain = expense.get({ plain: true });
            plain.category = plain.ExpenseCategory?.name || null;
            plain.entity = plain.Entity?.name || null;
            delete plain.ExpenseCategory;
            delete plain.Entity;
            return plain;
        }
        
        const formatted = formatExpense(data);
      
        res.status(200).json(formatted);

    }

    static async create(req, res) {

        try {

            const { expenseCategoryId, description, amount, date } = req.body;

            const category = await database.ExpenseCategory.findOne({
                where: {id: expenseCategoryId}
            })

            if (!category) {
                return res.status(404).json({ message: "Categoria de gasto não encontrada, verifique e tente novamente" })
            }

            const data = await database.Expense.create({
                entity_id: req.entityId,
                expense_category_id: expenseCategoryId,
                description: description,
                amount: amount,
                date: date
            })

            res.status(200).json({
                message: "Gasto cadastrado com sucesso",
                expense: {
                    entity: req.entityName,
                    caregory: category.name,
                    description: data.description,
                    amount: data.amount,
                    date: data.date,
                    createdAt: data.createdAt
                } 
            })

        } catch (error) {
            console.log(error);
        }
            
    }

    static async update(req, res) {

        try {

            const { expenseCategoryId, description, amount, date } = req.body;
            const expenseId = req.params.expenseId;

            const category = await database.ExpenseCategory.findOne({
                where: {id: expenseCategoryId}
            })

            if (!category) {
                return res.status(400).json({ message: "Não foi possivel atualizar o gasto. Categoria de gasto não encontrada, verifique e tente novamente" })
            }

            const data = await database.Expense.update(
                {
                    expense_category_id: expenseCategoryId,
                    description: description,
                    amount: amount,
                    date: date
                },
                {
                    where: {
                        id: expenseId,
                        entity_id: req.entityId
                    }
                }
            )

            if (data[0] === 0) {
                throw new Error('Nao foi possivel atualizar');
            }

            const updatedExpense = await database.Expense.findOne({
                where: { id: expenseId }
            });

            res.status(200).json({
                message: "Gasto da entidade atualizado com sucesso",
                Expense: {
                    entity: req.entityName,
                    caregory: category.name,
                    description: updatedExpense.description,
                    amount: updatedExpense.amount,
                    date: updatedExpense.date,
                    createdAt: updatedExpense.createdAt
                }
            });
            
        } catch (error) {
            console.log(error)
        }

    }

    static async delete(req, res) {

        try {

            const expenseId = req.params.expenseId;

            const find = await database.Expense.findOne({
                where: {
                    id: expenseId,
                    entity_id: req.entityId
                }
            })

            if (!find) {
                return res.status(404).json({ message: "Dados inválidos. Verifique e tente novamente"})
            }
            
            const data = await database.Expense.destroy({
                where: {
                    id: expenseId,
                    entity_id: req.entityId
                }
            });

            if (data === 0) {
                return res.status(500).json({ message: "Erro ao tentar excluir o gasto. Nenhum registro foi deletado" })
            }

            return res.status(200).json({
                message: "Gasto excluido com sucesso",
                expense_description: find.description
            })

        } catch (error) {
            console.log(error);
        }

    }

}

export default EntityExpenseController;