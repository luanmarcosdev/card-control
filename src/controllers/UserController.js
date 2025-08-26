// import database from '../database/models/index.cjs';
import UserRepository from '../repository/UserRepository.js';
import NotFoundError from '../errors/NotFoundError.js';

class UserController {

    static async getAuthUser(req, res, next) {
        try {

            const user = await UserRepository.findOneByPk(req.userId);

            if (!user) {
                throw new NotFoundError("Usuário não encontrado");
            }
            
            return res.status(200).json(user);
            
        } catch (error) {
            next(error);
        }
    }

    static async updateAuthUser(req, res, next) {
        try {
            // TODO VALIDAR DADOS DE ENTRADA
            const { name } = req.body;

            const user = await UserRepository.findOneByPk(req.userId);

            if (!user) {
                throw new NotFoundError("Usuário não encontrado");
            }

            const updatedUser = await UserRepository.update(req.userId, name);

            res.status(200).json({
                message: "Usuário atualizado com sucesso",
                updatedUser
            });

        } catch (error) {
            next(error);
        }
    }

}

export default UserController;