class ErrorBase extends Error {

    constructor(message = "Erro interno de servidor", status = 500) {
        super(message);
        this.message = message;
        this.status = status;
    }

    sendResponse(req, res) {
        res.status(this.status).json({
            status: this.status,
            message: this.message,
            method: req.method,
            path: req.originalUrl
        });
    }

}

export default ErrorBase;