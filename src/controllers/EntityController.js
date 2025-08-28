import EntityRepository from '../repository/EntityRepository.js';
import NotFoundError from '../errors/NotFoundError.js';

class EntityController {

    static async getAll(req, res, next) {
        try {
            const entities = await EntityRepository.getAllToAuthUser(req.userId);

            if (entities.length === 0) throw new NotFoundError("Nenhuma entidade cadastrada para o usuário");

            res.status(200).json(entities);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            // TO DO VERIFICAR ENTRADA DOS DADOS
            const { name, description } = req.body;

            const data = {
                user_id: req.userId,
                name,
                description
            };

            const entity = await EntityRepository.create(data);

            res.status(201).json({
                message: "Entidade criada com sucesso",
                entity: {
                    user_id: entity.user_id,
                    entity_id: entity.id,
                    name: entity.name,
                    description: entity.description,
                    createdAt: entity.createdAt
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const entity = await EntityRepository.findEntityToAuthUser(req.params.entityid, req.userId);          

            if (!entity) throw new NotFoundError("Entidade não encontrada")

            res.status(200).json(entity);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            // TO DO VALIDAR ENTRADA DOS DADOS
            const { name, description } = req.body;

            const entity = await EntityRepository.findEntityToAuthUser(req.params.entityid, req.userId);
            if (!entity) throw new NotFoundError('Entidade não encontrada');

            const data = { name, description };

            const updatedEntity = await EntityRepository.updateEntityToAuthUser(data, req.params.entityid, req.userId);
            if (updatedEntity[0] === 0) throw new Error('Não foi possivel atualizar');

            res.status(200).json({ message: "Entidade atualizada com sucesso" });
        } catch (error) {   
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const entity = await EntityRepository.deleteEntityToAuthUser(req.params.entityid, req.userId);

            if (entity === 0) throw new NotFoundError("Entidade não encontrada");

            res.status(200).json({ message: "Entidade deletada com sucesso" })
        } catch (error) {
            next(error);
        }
    }

}

export default EntityController;