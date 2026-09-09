import mongoose, { Schema, Document } from 'mongoose';

export interface IFacility extends Document {
  title: string;
  description: string;
  icon: string;
  image?: string;
  focalPoint?: { x: number; y: number };
  createdAt: Date;
}

const FacilitySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    image: { type: String },
    focalPoint: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 50 }
    }
  },
  { timestamps: true }
);

export const Facility = mongoose.model<IFacility>('Facility', FacilitySchema);
