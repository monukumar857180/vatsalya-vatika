import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db';
import { Event } from '../models/Event';
import { fallbackStore, StoreEvent } from '../services/fallbackStore';

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      const events = await Event.find().sort({ createdAt: 1 });
      res.status(200).json({ success: true, data: events });
    } else {
      res.status(200).json({ success: true, data: fallbackStore.events });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const event = await Event.findById(id);
      if (!event) {
        res.status(404).json({ success: false, message: 'Event not found.' });
        return;
      }
      res.status(200).json({ success: true, data: event });
    } else {
      const event = fallbackStore.events.find(e => e._id === id);
      if (!event) {
        res.status(404).json({ success: false, message: 'Event not found.' });
        return;
      }
      res.status(200).json({ success: true, data: event });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, image, date, category, location, focalPoint } = req.body;

    if (!title || !description || !image || !date) {
      res.status(400).json({ success: false, message: 'Title, description, image, and date are required.' });
      return;
    }

    if (isMongoConnected) {
      const event = await Event.create({ title, description, image, date, category, location, focalPoint });
      res.status(201).json({ success: true, message: 'Event created successfully.', data: event });
    } else {
      const newEvent: StoreEvent = {
        _id: 'evt-' + Date.now(),
        title,
        description,
        image,
        date,
        category: category || 'General',
        location: location || 'Vatsalya Vatika Campus',
        focalPoint,
        createdAt: new Date().toISOString()
      };
      fallbackStore.events.unshift(newEvent);
      res.status(201).json({ success: true, message: 'Event created successfully.', data: newEvent });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const updated = await Event.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Event not found.' });
        return;
      }
      res.status(200).json({ success: true, message: 'Event updated successfully.', data: updated });
    } else {
      const index = fallbackStore.events.findIndex(e => e._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Event not found.' });
        return;
      }
      fallbackStore.events[index] = { ...fallbackStore.events[index], ...req.body };
      res.status(200).json({ success: true, message: 'Event updated successfully.', data: fallbackStore.events[index] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const deleted = await Event.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Event not found.' });
        return;
      }
      res.status(200).json({ success: true, message: 'Event deleted successfully.' });
    } else {
      const index = fallbackStore.events.findIndex(e => e._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Event not found.' });
        return;
      }
      fallbackStore.events.splice(index, 1);
      res.status(200).json({ success: true, message: 'Event deleted successfully.' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
