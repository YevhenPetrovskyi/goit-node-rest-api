import jwt from 'jsonwebtoken';
import HttpError from '../helpers/HttpError.js';
import { User } from '../models/user.js';

export default function auth(req, _, next) {
  const authorizationHeader = req.headers.authorization;

  if (typeof authorizationHeader !== 'string' || authorizationHeader === '') {
    throw HttpError(401, 'Invalid token');
  }

  const [bearer, token] = authorizationHeader.split(' ', 2);

  if (bearer !== 'Bearer') {
    throw HttpError(401, 'Invalid token');
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      throw HttpError(401, 'Invalid token');
    }

    try {
      const user = await User.findById(decoded.id);

      if (user === null) {
        throw HttpError(401, 'Invalid token');
      }

      if (user.token !== token) {
        throw HttpError(401, 'Invalid token');
      }

      req.user = { id: decoded.id, subscription: user.subscription };

      next();
    } catch (error) {
      next(error);
    }
  });
}
