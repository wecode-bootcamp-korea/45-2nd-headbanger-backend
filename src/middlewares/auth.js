const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      const err = new Error('TOKEN_DOES_NOT_EXIST');
      err.statusCode = 409;
      throw err;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = payload.id;

    next();
  } catch (err) {
    next(err);
  }
};

const validateTokenUserUndefined = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let userId;

    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      userId = payload.id;
    }
    req.userId = userId;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateToken,
  validateTokenUserUndefined,
};