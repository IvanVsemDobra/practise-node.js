import { model, Schema } from 'mongoose';

const userShema = new Schema(
  {
    userName: { type: String, required: true },

    email: { type: String, required: true, unique: true, trim: true },

    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);
export const User = model('User', userShema);
