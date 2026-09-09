import mongoose, { Schema, Document } from 'mongoose';

export type MemoryVaultCategory = 'Campus' | 'Students' | 'Nature' | 'Events' | 'Activities' | 'Facilities' | 'Memories';

export interface IMemoryVault extends Document {
  title: string;
  image: string;
  description?: string;
  category: MemoryVaultCategory;
  cardNumber: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  focalPoint?: { x: number; y: number };
  createdAt: Date;
}

const MemoryVaultSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      required: true,
      enum: ['Campus', 'Students', 'Nature', 'Events', 'Activities', 'Facilities', 'Memories'],
      default: 'Memories'
    },
    cardNumber: { type: Number, default: 1 },
    rotation: { type: Number, default: 0 },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },
    focalPoint: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 50 }
    }
  },
  { timestamps: true }
);

export const MemoryVault = mongoose.model<IMemoryVault>('MemoryVault', MemoryVaultSchema);
