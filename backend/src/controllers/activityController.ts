import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db';
import { Activity } from '../models/Activity';
import { fallbackStore } from '../services/fallbackStore';

// GET /api/activities — Admin only
export const getActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, search, unread } = req.query;

    if (isMongoConnected) {
      const filter: Record<string, any> = {};
      if (type && type !== 'all') filter.type = type;
      if (unread === 'true') filter.isRead = false;

      let query = Activity.find(filter).sort({ createdAt: -1 }).limit(500);
      const items = await query;

      let result = items;
      if (search && typeof search === 'string') {
        const s = search.toLowerCase();
        result = items.filter(
          a => a.title.toLowerCase().includes(s) || a.description.toLowerCase().includes(s)
        );
      }
      res.status(200).json({ success: true, data: result });
    } else {
      let items = [...fallbackStore.activities];
      if (type && type !== 'all') items = items.filter(a => a.type === type);
      if (unread === 'true') items = items.filter(a => !a.isRead);
      if (search && typeof search === 'string') {
        const s = (search as string).toLowerCase();
        items = items.filter(
          a => a.title.toLowerCase().includes(s) || a.description.toLowerCase().includes(s)
        );
      }
      res.status(200).json({ success: true, data: items });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/activities/unread-count — Admin only
export const getUnreadCount = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      const count = await Activity.countDocuments({ isRead: false });
      res.status(200).json({ success: true, data: { count } });
    } else {
      const count = fallbackStore.activities.filter(a => !a.isRead).length;
      res.status(200).json({ success: true, data: { count } });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/activities/:id/read — Toggle read status
export const markRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const activity = await Activity.findById(id);
      if (!activity) { res.status(404).json({ success: false, message: 'Not found.' }); return; }
      activity.isRead = !activity.isRead;
      await activity.save();
      res.status(200).json({ success: true, data: activity });
    } else {
      const a = fallbackStore.activities.find(act => act._id === id);
      if (!a) { res.status(404).json({ success: false, message: 'Not found.' }); return; }
      a.isRead = !a.isRead;
      res.status(200).json({ success: true, data: a });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/activities/mark-all-read — Mark all as read
export const markAllRead = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      await Activity.updateMany({ isRead: false }, { isRead: true });
    } else {
      fallbackStore.activities.forEach(a => { a.isRead = true; });
    }
    res.status(200).json({ success: true, message: 'All activities marked as read.' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/activities/:id
export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await Activity.findByIdAndDelete(id);
    } else {
      const idx = fallbackStore.activities.findIndex(a => a._id === id);
      if (idx !== -1) fallbackStore.activities.splice(idx, 1);
    }
    res.status(200).json({ success: true, message: 'Activity deleted.' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
