import ErrorBase from "./ErrorBase.js";

class ForbiddenError extends ErrorBase {

    constructor(message) {
        super(message, 403);
    }

}

export default ForbiddenError;