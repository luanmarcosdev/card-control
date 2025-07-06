import bcrypt from "bcrypt";
import database from '../database/models/index.cjs';

class AuthController {

    static async register(req, res) {

        const SALT_ROUNDS = 10;

        try {
            const { name, email, password } = req.body;

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
            console.log(error)
        }
    }

    static async login(req, res) {
        // TODO
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

        res.json({ message: 'Login bem-sucedido' });

    }

}

export default AuthController;