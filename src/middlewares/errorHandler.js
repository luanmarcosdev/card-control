import ErrorBase from "../errors/ErrorBase.js";

function errorHandler(err, req, res, next) {
    if (err instanceof ErrorBase) {
        err.sendResponse(req, res);
    } else {
        console.error(err);
        new ErrorBase().sendResponse(req, res); 
    }
}

export default errorHandler;