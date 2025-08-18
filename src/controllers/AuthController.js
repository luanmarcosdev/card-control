import 'dotenv/config';
import bcrypt from "bcrypt";
import database from '../database/models/index.cjs';
import jsonwebtoken from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

class AuthController {

    static async register(req, res, next) {

        try {

            const { name, email, password } = req.body;
            // TODO VALIDAR ENTRADA DOS DADOS

            const SALT_ROUNDS = 10;
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            const data = await database.User.create({
                name: name,
                email: email,
                password: hashedPassword
            });
            
            return res.status(200).json({
                message: "Usuário criado com sucesso.",
                user: {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    createdAt: data.createdAt
                }
            });

        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {

        try {

            const { email, password } = req.body;
            // TODO VALIDAR ENTRADA DOS DADOS

            const user = await database.User.unscoped().findOne({
                where: { email: email }
            });
            
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
                accessToken: jwt,
                tokenType: "Bearer",
                expiresIn: "7200"
            });
            
        } catch (error) {
            next(error);
        }
    
    }

}

export default AuthController;