import ErrorBase from "./ErrorBase.js";

class BadRequestError extends ErrorBase {

    constructor(message) {
        super(message, 400);
    }

}

export default BadRequestError;