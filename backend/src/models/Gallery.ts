import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  image: string;
  category: 'Students' | 'Events' | 'Ashram' | 'Activities';
  description?: string;
  focalPoint?: { x: number; y: number };
  createdAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['Students', 'Events', 'Ashram', 'Activities'],
      default: 'Ashram'
    },
    description: { type: String },
    focalPoint: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 50 }
    }
  },
  { timestamps: true }
);

export const Gallery = mongoose.model<IGallery>('Gallery', GallerySchema);
