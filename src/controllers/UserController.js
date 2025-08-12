import database from '../database/models/index.cjs';
import NotFoundError from '../errors/NotFoundError.js';

class UserController {

    static async getAuthUser(req, res, next) {

        try {

            const user = await database.User.findOne( {where : {id: req.userId} });

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

            const user = await database.User.findOne({
                where: {id: req.userId}
            });

            if (!user) {
                throw new NotFoundError("Usuário não encontrado");
            }

            const data = await database.User.update(
                { name: name },
                { where: { id: req.userId } }
            );

            if (data[0] === 0) {
                throw new Error();
            }

            res.status(200).json({ message: "Usuário atualizado com sucesso" })

        } catch (error) {
            next(error);
        }
    }

}

export default UserController;