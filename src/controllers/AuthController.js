import 'dotenv/config';
import bcrypt from "bcrypt";
import UserRepository from '../repository/UserRepository.js';
import jsonwebtoken from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

class AuthController {

    static async register(req, res, next) {

        try {
            const { name, email, password } = req.body;

            const SALT_ROUNDS = 10;
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            const data = { name, email, password: hashedPassword };

            const user = await UserRepository.create(data);
            
            return res.status(200).json({
                message: "Usuário criado com sucesso.",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {

        try {
            // TODO VALIDAR ENTRADA DOS DADOS
            const { email, password } = req.body;

            const user = await UserRepository.findOneByEmail(email);
            
            if (!user) {
                throw new UnauthorizedError("Credenciais inválidas");
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new UnauthorizedError("Credenciais inválidas");
            }

            const jwt = jsonwebtoken.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '2h'}
            );

            res.status(200).json({
                tokenType: "Bearer",
                expiresIn: "7200",
                accessToken: jwt
            });
            
        } catch (error) {
            next(error);
        }
    
    }

}

export default AuthController;