import ErrorBase from "../errors/ErrorBase.js";

function errorHandler(err, req, res, next) {
    if (err instanceof ErrorBase) {
        err.sendResponse(res);
    } else {
        new ErrorBase().sendResponse(res); 
    }
}

export default errorHandler;