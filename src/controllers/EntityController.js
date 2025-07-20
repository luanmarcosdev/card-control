import { where } from 'sequelize';
import database from '../database/models/index.cjs';

class EntityController {

    static async getAll(req, res) {
        
        try {

            const id = req.userId;
            const data = await database.Entity.findAll( {where: {user_id: id}} );

            if (data.length === 0) {
                res.status(404).json({"message": "Nenhuma entidade cadastrada para o usuário"});
                return
            }

            res.status(200).json(data);

        } catch (error) {
            console.log(error);
        }

    }

    static async create(req, res) {
        
        try {
            
            const { name, description } = req.body;
            const id = req.userId;

            const data = await database.Entity.create({
                user_id: id,
                name: name,
                description: description
            })

            res.status(200).json({
                message: "Entidade criada com sucesso",
                entity: {
                    user_id: data.user_id,
                    name: data.name,
                    description: data.description,
                    createdAt: data.createdAt
                }
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    static async find(req, res) {

        try {
            
            const data = await database.Entity.findOne({ 
                where: {
                    id: req.params.entityid,
                    user_id: req.userId
                }
            })

            if (!data) {
                res.status(404).json({  message: "Entidade não encontrada." })
            }

            res.status(200).json(data);


        } catch (error) {
            console.log(error);
        }

    }

    static async update(req, res) {

        try {
            
            const { name, description } = req.body;

            const data = await database.Entity.update(
                {
                    name: name,
                    description: description
                },
                {
                    where: 
                    {
                        id: req.params.entityid,
                        user_id: req.userId
                    }
                }
            )

            if (data[0] === 0) {
                throw new Error('Nao foi possivel atualizar');
            }

            const updateEntity = await database.Entity.findOne(
                {
                    where: 
                    {
                        id: req.params.entityid,
                        user_id: req.userId
                    }
                }
            )

            res.status(200).json({
                message: "Entidade atualizada com sucesso",
                data: updateEntity
            })


        } catch (error) {   
            console.log(error);
        }

    }

    static async delete(req, res) {

        try {
        
            const data = await database.Entity.destroy({
                where:
                {
                    id: req.params.entityid,
                    user_id: req.userId
                }
            })

            res.status(200).json({
                message: "Entidade deletada com sucesso"
            })

        } catch (error) {
            console.log(error);
        }

    }

}

export default EntityController;