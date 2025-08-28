import database from '../database/models/index.cjs';

class EntityRepository {

    static async getAllToAuthUser(user_id) {
        return database.Entity.findAll({ where: { user_id } });
    }

    static async create(data) {
        return database.Entity.create(data);
    }

    static async findEntityToAuthUser(id, user_id) {
        return database.Entity.findOne({ where: { id, user_id } });
    }

    static async updateEntityToAuthUser(data, id, user_id) {
        return database.Entity.update( data, { where: { id, user_id } });
    }

    static async deleteEntityToAuthUser(id, user_id) {
        return database.Entity.destroy({ where: { id, user_id } });
    }

}

export default EntityRepository