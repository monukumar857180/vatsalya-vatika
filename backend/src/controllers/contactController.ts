import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db';
import { Contact } from '../models/Contact';
import { fallbackStore, StoreContact } from '../services/fallbackStore';
import { logActivity } from '../services/notificationService';

export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
      return;
    }

    if (isMongoConnected) {
      const contact = await Contact.create({ name, email, phone, message, status: 'new' });
      res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been submitted successfully.',
        data: contact
      });
      logActivity('contact', '📬 New Contact Message', `${name} sent a message via the contact form.`, { name, email, phone }).catch(() => {});
    } else {
      const newContact: StoreContact = {
        _id: 'cnt-' + Date.now(),
        name,
        email,
        phone,
        message,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      fallbackStore.contacts.unshift(newContact);
      res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been submitted successfully.',
        data: newContact
      });
      logActivity('contact', '📬 New Contact Message', `${name} sent a message via the contact form.`, { name, email, phone }).catch(() => {});
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Unable to submit your message. Please try again.' });
  }
};

export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      const items = await Contact.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: items });
    } else {
      res.status(200).json({ success: true, data: fallbackStore.contacts });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateContactStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status value.' });
      return;
    }

    if (isMongoConnected) {
      const updated = await Contact.findByIdAndUpdate(id, { status }, { new: true });
      if (!updated) {
        res.status(404).json({ success: false, message: 'Message not found.' });
        return;
      }
      res.status(200).json({ success: true, message: 'Status updated.', data: updated });
    } else {
      const index = fallbackStore.contacts.findIndex(c => c._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Message not found.' });
        return;
      }
      fallbackStore.contacts[index].status = status;
      res.status(200).json({ success: true, message: 'Status updated.', data: fallbackStore.contacts[index] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const deleted = await Contact.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Message not found.' });
        return;
      }
      res.status(200).json({ success: true, message: 'Message deleted successfully.' });
    } else {
      const index = fallbackStore.contacts.findIndex(c => c._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Message not found.' });
        return;
      }
      fallbackStore.contacts.splice(index, 1);
      res.status(200).json({ success: true, message: 'Message deleted successfully.' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
