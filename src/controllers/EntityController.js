import { where } from 'sequelize';
import database from '../database/models/index.cjs';
import NotFoundError from '../errors/NotFoundError.js';

class EntityController {

    static async getAll(req, res, next) {
        
        try {

            const id = req.userId;
            const data = await database.Entity.findAll( {where: {user_id: id}} );

            if (data.length === 0) {
                throw new NotFoundError("Nenhuma entidade cadastrada para o usuário");
            }

            res.status(200).json(data);

        } catch (error) {
            next(error);
        }

    }

    static async create(req, res, next) {
        
        try {
            
            const { name, description } = req.body;
            // TO DO VERIFICAR ENTRADA DOS DADOS

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
                    entity_id: data.id,
                    name: data.name,
                    description: data.description,
                    createdAt: data.createdAt
                }
            })
            
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {

        try {
            
            const data = await database.Entity.findOne({ 
                where: {
                    id: req.params.entityid,
                    user_id: req.userId
                }
            })

            if (!data) {
                throw new NotFoundError("Entidade não encontrada")
            }

            res.status(200).json(data);

        } catch (error) {
            next(error);
        }

    }

    static async update(req, res, next) {

        try {
                
            const entityId = req.params.entityid;

            const { name, description } = req.body;
            // TO DO VALIDAR ENTRADA DOS DADOS

            const entity = await database.Entity.findOne(
                {
                    where: 
                    {
                        id: entityId,
                        user_id: req.userId
                    }
                }
            )

            if (!entity) {
                throw new NotFoundError('Entidade não encontrada')
            }

            const update = await database.Entity.update(
                {
                    name: name,
                    description: description
                },
                {
                    where: 
                    {
                        id: entityId,
                        user_id: req.userId
                    }
                }
            )

            if (update[0] === 0) {
                throw new Error();
            }

            res.status(200).json({ message: "Entidade atualizada com sucesso" })

        } catch (error) {   
            next(error);
        }

    }

    static async delete(req, res, next) {

        try {
        
            const data = await database.Entity.destroy({
                where:
                {
                    id: req.params.entityid,
                    user_id: req.userId
                }
            })

            if (data === 0) {
                throw new NotFoundError("Entidade não encontrada");
            }

            res.status(200).json({ message: "Entidade deletada com sucesso" })

        } catch (error) {
            next(error);
        }

    }

}

export default EntityController;