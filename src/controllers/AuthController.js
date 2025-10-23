import AuthService from '../services/AuthService.js';

class AuthController {

    static async register(req, res, next) {
        try {
            const user = await AuthService.register(req.body);
            return res.status(201).json({message: "Usuário criado com sucesso.", user});
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const user = await AuthService.login(req.body);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

}

export default AuthController;