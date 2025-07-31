import database from '../database/models/index.cjs';

async function verifyEntityOwnership(req, res, next) {

    const entity = await database.Entity.findOne({
        where: {
            id: req.params.entityid,
            user_id: req.userId
        }
    })

    if (!entity) {
        return res.status(403).json({ message: "A entidade não pertence a este usuário"})
    }

    next();

}

export default verifyEntityOwnership;