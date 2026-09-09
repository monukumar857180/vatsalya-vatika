import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  phone?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'], 
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true, 
      lowercase: true,
      match: [/^(?:(?![^@]*\.{2})[a-zA-Z0-9._%+-]+@(?!gmail\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?![.])(?!.*[.]{2})[a-zA-Z0-9.]{6,30}(?<![.])@gmail\.com)$/i, 'Please provide a valid email address. Random or sub-addressed Gmail addresses are not allowed.']
    },
    password: { 
      type: String, 
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long']
    },
    phone: {
      type: String,
      match: [/^(?:\+?\d{1,3}[- ]?)?\d{10}$/, 'Please provide a valid 10-digit mobile number'],
      required: false
    },
    role: { 
      type: String, 
      enum: ['admin', 'user'], 
      default: 'user' 
    }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
