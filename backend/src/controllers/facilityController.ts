import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db';
import { Facility } from '../models/Facility';
import { fallbackStore, StoreFacility } from '../services/fallbackStore';

export const getFacilities = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      const items = await Facility.find();
      res.status(200).json({ success: true, data: items });
    } else {
      res.status(200).json({ success: true, data: fallbackStore.facilities });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createFacility = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, icon, image } = req.body;

    if (!title || !description || !icon) {
      res.status(400).json({ success: false, message: 'Title, description, and icon name are required.' });
      return;
    }

    if (isMongoConnected) {
      const facility = await Facility.create({ title, description, icon, image });
      res.status(201).json({ success: true, message: 'Facility created successfully.', data: facility });
    } else {
      const newFacility: StoreFacility = {
        _id: 'fac-' + Date.now(),
        title,
        description,
        icon,
        image,
        createdAt: new Date().toISOString()
      };
      fallbackStore.facilities.push(newFacility);
      res.status(201).json({ success: true, message: 'Facility created successfully.', data: newFacility });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFacility = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const updated = await Facility.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Facility not found.' });
        return;
      }
      res.status(200).json({ success: true, message: 'Facility updated.', data: updated });
    } else {
      const index = fallbackStore.facilities.findIndex(f => f._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Facility not found.' });
        return;
      }
      fallbackStore.facilities[index] = { ...fallbackStore.facilities[index], ...req.body };
      res.status(200).json({ success: true, message: 'Facility updated.', data: fallbackStore.facilities[index] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFacility = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const deleted = await Facility.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Facility not found.' });
        return;
      }
      res.status(200).json({ success: true, message: 'Facility deleted successfully.' });
    } else {
      const index = fallbackStore.facilities.findIndex(f => f._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Facility not found.' });
        return;
      }
      fallbackStore.facilities.splice(index, 1);
      res.status(200).json({ success: true, message: 'Facility deleted successfully.' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
