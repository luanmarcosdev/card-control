import database from '../models/index.cjs';

class UserController {

    static async getAll(req, res) {
        try {
            const data = await database.User.findAll();
            return res.status(200).json(data);
        } catch (error) {
            console.log(error)
        }
    }

}

export default UserController;