import ErrorBase from "./ErrorBase.js";

class UnauthorizedError extends ErrorBase {

    constructor(message) {
        super(message, 401);
    } 

}

export default UnauthorizedError;