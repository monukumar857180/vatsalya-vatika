import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  name: string;
  email?: string;
  rating: number;       // 1–5
  comment: string;
  approved: boolean;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
      trim: true
    },
    email: {
      type: String,
      required: false,
      match: [/^(?:(?![^@]*\.{2})[a-zA-Z0-9._%+-]+@(?!gmail\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?![.])(?!.*[.]{2})[a-zA-Z0-9.]{6,30}(?<![.])@gmail\.com)$/i, 'Please enter a valid email. Random or sub-addressed Gmail addresses are not allowed.'],
      trim: true
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      minlength: [10, 'Comment must be at least 10 characters'],
      maxlength: [500, 'Comment cannot exceed 500 characters'],
      trim: true
    },
    approved: {
      type: Boolean,
      default: true   // auto-approve; admin can toggle
    }
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
