import database from '../database/models/index.cjs';

async function verifyEntityOwnership(req, res, next) {

    const entity = await database.Entity.findOne({
        where: {
            id: req.params.entityid,
            user_id: req.userId
        }
    })

    if (!entity) {
        return res.status(403).json({
            status: 403,
            message: "Acesso negado à entidade",
            method: req.method,
            path: req.originalUrl,
        });
    }

    req.entityName = entity.name;
    req.entityId = entity.id;

    next();
}

export default verifyEntityOwnership;