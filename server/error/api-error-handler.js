const ApiError = require('./api-error');

function apiErrorHandler(err, req, res, next) {
    console.log('err', err);
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ err });
    }

    return res.status(500).json('Internal Server Error');
}

module.exports = apiErrorHandler;