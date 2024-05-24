import HttpError from './HttpError.js';

const validateQuery = (schema) => {
  const func = (req, _, next) => {
    const { error, value } = schema.validate(req.query);
    console.log(req.params);
    if (error) {
      next(HttpError(400, error.message));
    }

    req.query = value;

    next();
  };

  return func;
};

export default validateQuery;
