import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export interface IUser extends Document {
  firstname?: string;
  lastname?: string;
  username: string;
  age?: string;
  dob?: string;
  email: string;
  password: string;
  phonenumber?: number;
  gender: string;
  image: string;
  coverimage: string;
  address?: {
    city: string;
    state: string;
    houseno: string;
  };
  comparePassword: (password: string) => Promise<boolean>;
  generateToken: () => string;
}

const userSchema = new Schema<IUser>(
  {
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    username: { type: String, trim: true },
    age: { type: String, trim: true },
    dob: { type: String, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    address: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
    },
    image: { type: String },
    coverimage: { type: String },
    gender: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      if (error instanceof Error) return next(error);
    }
  }
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  if (!this.password) {
    return false;
  }

  try {
    // Perform password comparison
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    // Handle errors from bcrypt
    if (error instanceof Error) {
      // Log the specific error message
      console.error('Error comparing passwords:', error.message);
    } else {
      // If the error is not an instance of Error, handle it generically
      console.error('An unknown error occurred while comparing passwords.');
    }
    // Return false in case of an error
    return false;
  }
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.username,
      email: this.email,
    },
    config.JWT_SECRET as string,
    {
      expiresIn: config.JWT_EXPIRATION,
    }
  );
};

const User = model<IUser>('user', userSchema);

export default User;
