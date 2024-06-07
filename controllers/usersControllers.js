import * as fs from 'node:fs/promises';
import path from 'node:path';
import Jimp from 'jimp';

import HttpError from '../helpers/HttpError.js';
import { User } from '../models/user.js';
import sendMail from '../helpers/sendMail.js';

const { BASE_URI } = process.env;

export const changeAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, 'File not found');
    }

    const { path: tempUploadPath, filename } = req.file;

    const newPath = path.resolve('public', 'avatars', filename);

    const image = await Jimp.read(tempUploadPath);

    await image.resize(250, 250).writeAsync(tempUploadPath);

    fs.rename(tempUploadPath, newPath);

    const avatarURL = `/avatars/${filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL },
      { new: true }
    );

    res.json({ id: user._id, avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw HttpError(404, 'User not found');
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.json({ message: 'Verification successful' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(404, 'User not found');
    }

    if (user.verify) {
      throw HttpError(400, 'Verification has already been passed');
    }

    const mail = {
      to: user.email,
      subject: 'Verify email',
      html: `<p>To confirm your email address click the following link:</p><a target="_blank" href="${BASE_URI}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
      text: `To confirm your email address click the following link: ${BASE_URI}/api/users/verify/${user.verificationToken}`,
    };

    await sendMail(mail);
    if (!mail) {
      throw HttpError(500, 'Email not sent');
    }

    res.json({ message: 'Verification email sent' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
