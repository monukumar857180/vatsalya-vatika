import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db';
import { Gallery } from '../models/Gallery';
import { fallbackStore, StoreGallery } from '../services/fallbackStore';

export const getGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      const items = await Gallery.find().sort({ createdAt: 1 });
      res.status(200).json({ success: true, data: items });
    } else {
      res.status(200).json({ success: true, data: fallbackStore.gallery });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGalleryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const item = await Gallery.findById(id);
      if (!item) {
        res.status(404).json({ success: false, message: 'Gallery item not found.' });
        return;
      }
      res.status(200).json({ success: true, data: item });
    } else {
      const item = fallbackStore.gallery.find(g => g._id === id);
      if (!item) {
        res.status(404).json({ success: false, message: 'Gallery item not found.' });
        return;
      }
      res.status(200).json({ success: true, data: item });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, image, category, description, focalPoint } = req.body;

    if (!title || !image || !category) {
      res.status(400).json({ success: false, message: 'Title, image URL, and category are required.' });
      return;
    }

    if (isMongoConnected) {
      const item = await Gallery.create({ title, image, category, description, focalPoint });
      res.status(201).json({ success: true, message: 'Gallery item added successfully.', data: item });
    } else {
      const newItem: StoreGallery = {
        _id: 'gal-' + Date.now(),
        title,
        image,
        category: category || 'Ashram',
        description,
        focalPoint,
        createdAt: new Date().toISOString()
      };
      fallbackStore.gallery.unshift(newItem);
      res.status(201).json({ success: true, message: 'Gallery item added successfully.', data: newItem });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const updated = await Gallery.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Gallery item not found.' });
        return;
      }
      res.status(200).json({ success: true, message: 'Gallery item updated.', data: updated });
    } else {
      const index = fallbackStore.gallery.findIndex(g => g._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Gallery item not found.' });
        return;
      }
      fallbackStore.gallery[index] = { ...fallbackStore.gallery[index], ...req.body };
      res.status(200).json({ success: true, message: 'Gallery item updated.', data: fallbackStore.gallery[index] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const deleted = await Gallery.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Gallery item not found.' });
        return;
      }
      res.status(200).json({ success: true, message: 'Gallery item deleted successfully.' });
    } else {
      const index = fallbackStore.gallery.findIndex(g => g._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Gallery item not found.' });
        return;
      }
      fallbackStore.gallery.splice(index, 1);
      res.status(200).json({ success: true, message: 'Gallery item deleted successfully.' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
