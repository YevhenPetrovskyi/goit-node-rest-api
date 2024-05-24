import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const isPasswordEqual = await user.comparePassword(password);

    if (!isPasswordEqual) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  const { id } = req.user;

  try {
    await User.findByIdAndUpdate(id, { token: null }, { new: true });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const current = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);

    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    console.log(req.body);
    if (
      Object.keys(req.body).length !== 1 ||
      Object.keys(req.body)[0] !== 'subscription'
    ) {
      throw HttpError(400, 'Body must have only subscription field');
    }

    const { subscription } = req.body;

    const result = await User.findByIdAndUpdate(
      req.user.id,
      { subscription },
      { new: true }
    );

    if (result === null) {
      throw HttpError(404);
    }

    res.json({
      id: result._id,
      subscription: result.subscription,
    });
  } catch (error) {
    next(error);
  }
};
