const createError = require('http-errors');

const isAdmin = (req, res, next) => { // eslint-disable-line
  if (req.role !== 'admin') {
    return next(createError.Unauthorized('You don`t have permission to perform this action'));
  }

  next();
};

module.exports = isAdmin;
