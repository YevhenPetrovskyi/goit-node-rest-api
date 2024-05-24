import jwt from 'jsonwebtoken';
import HttpError from './HttpError.js';
import { User } from '../models/user.js';

function auth(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (typeof authorizationHeader !== 'string') {
    next(HttpError(401, 'Invalid token'));
  }

  const [bearer, token] = authorizationHeader.split(' ', 2);

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Invalid token'));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      next(HttpError(401, 'Invalid token'));
    }

    try {
      const user = await User.findById(decoded.id);

      if (user === null) {
        next(HttpError(401, 'Invalid token'));
      }

      if (user.token !== token) {
        next(HttpError(401, 'Invalid token'));
      }

      req.user = user;

      next();
    } catch {
      next(HttpError(401, 'Invalid token'));
    }
  });
}

export default auth;
