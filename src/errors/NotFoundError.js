import ErrorBase from './ErrorBase.js';

class NotFoundError extends ErrorBase {

    constructor(message) {
        super(message, 404);
    }

}

export default NotFoundError;