class CustomError extends Error {

    constructor(statusCode, errorMessage) {
        super(errorMessage);
        this.statusCode = statusCode;
    }
}

module.exports = CustomError;