import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

const ContactSchema: Schema = new Schema(
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
      match: [/^(?:(?![^@]*\.{2})[a-zA-Z0-9._%+-]+@(?!gmail\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?![.])(?!.*[.]{2})[a-zA-Z0-9.]{6,30}(?<![.])@gmail\.com)$/i, 'Please provide a valid email address. Random or sub-addressed Gmail addresses are not allowed.']
    },
    phone: { 
      type: String,
      match: [/^(?:\+?\d{1,3}[- ]?)?\d{10}$/, 'Please provide a valid 10-digit mobile number'],
      required: false
    },
    message: { 
      type: String, 
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters long'],
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: { 
      type: String, 
      enum: ['new', 'read', 'replied'], 
      default: 'new' 
    }
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>('Contact', ContactSchema);
