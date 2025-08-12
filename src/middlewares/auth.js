import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

function authToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new UnauthorizedError('Token não fornecido')
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        throw new UnauthorizedError('Token mal formatado');
    }

    const token = parts[1];
    
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        next();
    } catch {
        throw new UnauthorizedError('Token inválido ou expirado');
    }
}

export default authToken;