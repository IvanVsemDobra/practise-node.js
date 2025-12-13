import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
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
