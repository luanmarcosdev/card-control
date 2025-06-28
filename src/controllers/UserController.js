import database from '../database/models/index.cjs';

class UserController {

    static async getAll(req, res) {
        try {
            const data = await database.User.findAll();
            return res.status(200).json(data);
        } catch (error) {
            console.log(error)
        }
    }

    static async find(req, res) {
        try {
            const id = req.params.id;
            const data = await database.User.findByPk(id);
            return res.status(200).json(data);
        } catch (error) {
            console.log(error)
        }
    }

    static async create(req, res) {
        try {
            const jsonUser = req.body;
            let data = await database.User.create(jsonUser);
            const { password, ...safeUser } = data.get();
            return res.status(200).json({
                message: "Usuário criado com sucesso.",
                user: safeUser
            });
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            const deleted = await database.User.destroy({
                where : {id}
            });
            return res.status(200).json({
                message: "Usuário deletado com sucesso."
            });
        } catch (error) {
            console.log(error)
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            const json = req.body;
            const data = await database.User.update(
                {
                    name: json.name
                },
                {
                    where: { id: id }
                }
            )
            return res.status(200).json({
                message: "Atualizado com sucesso.",
                user: data
            })
        } catch (error) {
            console.log(error)
        }
    }

}

export default UserController;