import mongoose, { Document, Schema } from 'mongoose';

export interface ICarouselImage extends Document {
  image: string;
  title?: string;
  description?: string;
  category?: string;
  date?: Date;
  isActive: boolean;
  order: number;
  createdAt: Date;
}

const CarouselImageSchema: Schema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    category: { type: String },
    date: { type: Date },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.CarouselImage || mongoose.model<ICarouselImage>('CarouselImage', CarouselImageSchema);
