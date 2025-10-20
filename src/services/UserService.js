import UserRepository from '../repository/UserRepository.js';
import NotFoundError from '../errors/NotFoundError.js';

class UserService {

    static async #validateUser(userId) {
        const user = await UserRepository.findOneByPk(userId);
        if (!user) throw new NotFoundError("Usuário não encontrado");
        return user;
    }

    static async getAuthUser(userId) {
        const user = await this.#validateUser(userId);
        return user;
    }

    static async updateAuthUser(name, userId) {
        await this.#validateUser(userId);
        await UserRepository.update(userId, name);
        return {
            message: "Usuário atualizado com sucesso"
        };
    }

}

export default UserService;