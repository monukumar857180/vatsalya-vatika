import mongoose, { Document, Schema } from 'mongoose';

export interface IStudentImage extends Document {
  title: string;
  image: string;
  description: string;
  focalPoint?: { x: number; y: number };
  createdAt: Date;
}

const StudentImageSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    focalPoint: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 50 }
    }
  },
  { timestamps: true }
);

export default mongoose.models.StudentImage || mongoose.model<IStudentImage>('StudentImage', StudentImageSchema);
