import { Request, Response } from 'express';
import StudentImage from '../models/StudentImage';
import { fallbackStore, StoreStudentImage } from '../services/fallbackStore';
import mongoose from 'mongoose';

const checkMongoConnected = () => mongoose.connection.readyState === 1;

export const getAllStudentImages = async (req: Request, res: Response): Promise<void> => {
  try {
    if (checkMongoConnected()) {
      let items = await StudentImage.find().sort({ createdAt: 1 });
      if (items.length === 0) {
        // Seed default items if empty
        const defaultItems = fallbackStore.studentImages.map(({ _id, ...rest }) => rest);
        items = await StudentImage.insertMany(defaultItems);
      }
      res.status(200).json({ success: true, data: items });
    } else {
      res.status(200).json({ success: true, data: fallbackStore.studentImages });
    }
  } catch (error: any) {
    console.error('StudentImage getAll error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server Error', error });
  }
};

export const createStudentImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, image, description } = req.body;

    if (!title || !image || !description) {
      res.status(400).json({ success: false, message: 'Missing required fields.' });
      return;
    }

    if (checkMongoConnected()) {
      const item = await StudentImage.create({ title, image, description });
      res.status(201).json({ success: true, message: 'Student entry created successfully.', data: item });
    } else {
      const newItem: StoreStudentImage = {
        _id: 'si-' + Date.now(),
        title,
        image,
        description,
        createdAt: new Date().toISOString()
      };
      fallbackStore.studentImages.push(newItem);
      res.status(201).json({ success: true, message: 'Student entry created successfully.', data: newItem });
    }
  } catch (error: any) {
    console.error('StudentImage create error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server Error', error });
  }
};

export const updateStudentImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, image, description } = req.body;

    if (checkMongoConnected()) {
      const item = await StudentImage.findByIdAndUpdate(id, { title, image, description }, { new: true });
      if (!item) {
        res.status(404).json({ success: false, message: 'Entry not found' });
        return;
      }
      res.status(200).json({ success: true, message: 'Student entry updated successfully.', data: item });
    } else {
      const index = fallbackStore.studentImages.findIndex(s => s._id === id);
      if (index !== -1) {
        if (title) fallbackStore.studentImages[index].title = title;
        if (image) fallbackStore.studentImages[index].image = image;
        if (description) fallbackStore.studentImages[index].description = description;
        res.status(200).json({ success: true, message: 'Student entry updated successfully.', data: fallbackStore.studentImages[index] });
      } else {
        res.status(404).json({ success: false, message: 'Entry not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

export const deleteStudentImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (checkMongoConnected()) {
      const deleted = await StudentImage.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Entry not found' });
        return;
      }
      res.status(200).json({ success: true, message: 'Student entry deleted successfully.' });
    } else {
      const initialLength = fallbackStore.studentImages.length;
      fallbackStore.studentImages = fallbackStore.studentImages.filter(s => s._id !== id);
      if (fallbackStore.studentImages.length === initialLength) {
        res.status(404).json({ success: false, message: 'Entry not found' });
        return;
      }
      res.status(200).json({ success: true, message: 'Student entry deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};
