import UserRepository from '../repository/UserRepository.js';
import NotFoundError from '../errors/NotFoundError.js';

class UserService {

    static async getAuthUser(userId) {
        const user = await UserRepository.findOneByPk(userId);
        if (!user) throw new NotFoundError("Usuário não encontrado");
        return user;
    }

    static async updateAuthUser(name, userId) {
        const user = await UserRepository.findOneByPk(userId);
        if (!user) throw new NotFoundError("Usuário não encontrado");
        await UserRepository.update(userId, name);
        return;
    }

}

export default UserService;