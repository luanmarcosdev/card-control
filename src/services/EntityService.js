import EntityRepository from '../repository/EntityRepository.js';
import NotFoundError from '../errors/NotFoundError.js';

class EntityService {

    static async getAll(userId) {
        const entities = await EntityRepository.getAllToAuthUser(userId);
        if (entities.length === 0) throw new NotFoundError("Nenhuma entidade cadastrada para o usuário");
        return entities;
    }

    static async create(entityData, userId) {
        const { name, description } = entityData;

        const data = {
            user_id: userId,
            name,
            description
        };

        const entity = await EntityRepository.create(data);

        return {
            message: "Entidade criada com sucesso",
            entity: {
                user_id: entity.user_id,
                entity_id: entity.id,
                name: entity.name,
                description: entity.description,
                createdAt: entity.createdAt
            }
        };
    }

    static async find(entityId, userId) {
        const entity = await EntityRepository.findEntityToAuthUser(entityId, userId);
        if (!entity) throw new NotFoundError("Entidade não encontrada")
        return entity;
    }

    static async update(entityData, entityId, userId) {
        const { name, description } = entityData;

        const entity = await EntityRepository.findEntityToAuthUser(entityId, userId);
        if (!entity) throw new NotFoundError('Entidade não encontrada');

        const data = { name, description };

        const updatedEntity = await EntityRepository.updateEntityToAuthUser(data, entityId, userId);
        if (updatedEntity[0] === 0) throw new NotFoundError('Entidade não encontrada para atualização');

        return { message: "Entidade atualizada com sucesso" };
    }

    static async delete(entityId, userId) {
        const entity = await EntityRepository.deleteEntityToAuthUser(entityId, userId);
        if (entity === 0) throw new NotFoundError("Entidade não encontrada");
        return { message: "Entidade deletada com sucesso" };
    }

}

export default EntityService;