import UserService from '../services/UserService.js';

class UserController {

    static async getAuthUser(req, res, next) {
        try {
            const userId = req.userId;
            const user = await UserService.getAuthUser(userId);
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async updateAuthUser(req, res, next) {
        try {
            const { name } = req.body;
            const userId = req.userId;
            const result = await UserService.updateAuthUser(name, userId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

}

export default UserController;