class ApiError {
    constructor(statusCode, status) {
        this.statusCode = statusCode;
        this.message = message;
    }

    static badRequest(msg){
        return new ApiError(400, msg);
    }

    static internalServerError(msg){
        return new ApiError(500, msg);
    }
}

module.exports = ApiError;