const ApiError = require('../error/api-error');

function validateDto (schema) {
    return async (req, res, next) => {
        try{
            const validatedBody = await schema.validate(req.body);
            req.body = validatedBody;
            next();
        }
        catch(err){
            next(ApiError.badRequest(err));
            // res.status(400).send(err);
        }
    }
}

module.exports = validateDto;