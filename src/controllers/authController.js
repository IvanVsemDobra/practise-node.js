import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { createSession, setSessionCookies } from '../services/auth.js';
import { Session } from '../models/session.js';
import { sendEmail } from '../utils/sendMail.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401);
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw createHttpError(401);
  }

  const newSession = await createSession(user._id);

  setSessionCookies(res, newSession);

  res.status(200).json(user);
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const requestResetEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const jwtToken = jwt.sign({ sub: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: '20m',
  });
  const link = `${process.env.FRONTEND_DOMAIN}/reset-password?token=${jwtToken}`;

  try {
    await sendEmail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${link}">here</a> to reset your password!</p>`,
    });
  } catch (error) {
    console.error(error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }

  res.status(200).json({ message: 'Password reset email sent successfully' });
};
