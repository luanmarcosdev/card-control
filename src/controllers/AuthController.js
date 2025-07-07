import 'dotenv/config';
import bcrypt from "bcrypt";
import database from '../database/models/index.cjs';
import jsonwebtoken from 'jsonwebtoken';

class AuthController {

    static async register(req, res) {

        try {
            const { name, email, password } = req.body;

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
            console.log(error);
        }
    }

    static async login(req, res) {
        // TODO
        try {
            const { email, password } = req.body;

            const user = await database.User.unscoped().findOne({
                where: { email: email }
            });
            
            if (!user) {
                return res.status(401).json({ message: 'nenhum usuario encontrado com esse email' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Senha nao confere' });
            }

            const jwt = jsonwebtoken.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '2h'}
            );

            // console.log(`User id: ${user.id}`);
            // console.log(`User email: ${user.email}`);
            // console.log(`JWT SECRET: ${process.env.JWT_SECRET}`);

            res.json({ token: jwt });
        } catch (error) {
            console.log(error);
        }
    
    }

}

export default AuthController;