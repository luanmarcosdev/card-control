import EntityService from '../services/EntityService.js';

class EntityController {

    static async getAll(req, res, next) {
        try {
            const entities = await EntityService.getAll(req.userId);
            res.status(200).json(entities);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const entity = await EntityService.create(req.body, req.userId)
            res.status(201).json(entity);
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const entity = await EntityService.find(req.params.entityid, req.userId);
            res.status(200).json(entity);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const result = await EntityService.update(req.body, req.params.entityid, req.userId);
            res.status(200).json(result);
        } catch (error) {   
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await EntityService.delete(req.params.entityid, req.userId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

}

export default EntityController;