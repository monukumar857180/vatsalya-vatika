import mongoose, { Schema, Document } from 'mongoose';

export type ActivityType = 
  | 'signup' 
  | 'login' 
  | 'contact' 
  | 'review' 
  | 'contribution' 
  | 'contribution_guest'
  | 'suggestion'
  | 'other';

export interface IActivity extends Document {
  type: ActivityType;
  title: string;
  description: string;
  metadata?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
}

const ActivitySchema: Schema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['signup', 'login', 'contact', 'review', 'contribution', 'contribution_guest', 'suggestion', 'other'],
      default: 'other'
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
    isRead: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
