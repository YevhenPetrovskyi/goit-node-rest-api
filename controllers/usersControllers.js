import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import HttpError from '../helpers/HttpError.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, 'Email in use');
    }

    const newUser = new User({ email, password });
    await newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
