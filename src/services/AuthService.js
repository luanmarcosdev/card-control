import 'dotenv/config';
import bcrypt from "bcrypt";
import UserRepository from '../repository/UserRepository.js';
import BadRequestError from '../errors/BadRequestError.js'
import jsonwebtoken from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

class AuthService {

    static async register(userData) {

        if (!userData.name || !userData.email || !userData.password) {
            throw new BadRequestError("name, email e password são obrigatórios");
        }

        const { name, email, password } = userData;

        const existingUser = await UserRepository.findOneByEmail(email);
        if (existingUser) throw new BadRequestError("E-mail já cadastrado");

        const SALT_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        
        const data = { name, email, password: hashedPassword };
        const user = await UserRepository.create(data);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };
    }

    static async login(userData) {
        if (!userData.email || !userData.password) {
            throw new BadRequestError("email e password são obrigatórios");
        }
        const { email, password } = userData;

        const user = await UserRepository.findOneByEmail(email);
        if (!user) throw new UnauthorizedError("Credenciais inválidas");
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedError("Credenciais inválidas");
    
        const jwt = jsonwebtoken.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h'}
        );

        return {
            tokenType: "Bearer",
            expiresIn: "7200",
            accessToken: jwt
        };
    }

}

export default AuthService;