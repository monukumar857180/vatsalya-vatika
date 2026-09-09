import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  location: string;
  focalPoint?: { x: number; y: number };
  createdAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true, default: 'General' },
    location: { type: String, required: true, default: 'Vatsalya Vatika Ashram Campus' },
    focalPoint: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 50 }
    }
  },
  { timestamps: true }
);

export const Event = mongoose.model<IEvent>('Event', EventSchema);
