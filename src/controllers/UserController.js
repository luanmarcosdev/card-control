import database from '../database/models/index.cjs';

class UserController {

    static async getAuthUser(req, res) {
        try {
            const data = await database.User.findOne( {where : {id: req.userId}});
            return res.status(200).json(data);
        } catch (error) {
            console.log(error)
        }
    }

    static async updateAuthUser(req, res) {
        try {
            const id = req.userId;
            const json = req.body;

            const data = await database.User.update(
                {
                    name: json.name
                },
                {
                    where: { id: id }
                }
            )

            if (data[0] === 0) {
                throw new Error('Nao foi possivel atualizar');
            }

            const updatedUser = await database.User.findOne({ where: {id: id} });

            return res.status(200).json({
                message: "Atualizado com sucesso.",
                user: updatedUser
            })
        } catch (error) {
            console.log(error)
        }
    }

}

export default UserController;