import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';

function authToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({message: 'Token não fornecido'});

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({message: 'Token mal formatado'});

    const token = parts[1];
    
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        next();
    } catch {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
}

export default authToken;