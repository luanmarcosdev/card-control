import database from '../database/models/index.cjs';

class UserRepository {

    static async create(data) {
        return database.User.create(data);
    }

    static async findOneByEmail(email) {
        return database.User.unscoped().findOne({ where: { email } });
    }

    static async findOneByPk(id) {
        return database.User.findByPk(id);
    }

    static async update(id, name) {
        await database.User.update({ name }, { where: { id } });
        return this.findOneByPk(id);
    }

    static async deleteByEmail(email) {
        return database.User.destroy({ where: { email } });
    }

}

export default UserRepository;