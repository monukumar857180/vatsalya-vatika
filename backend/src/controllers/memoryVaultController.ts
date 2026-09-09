import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db';
import { MemoryVault } from '../models/MemoryVault';
import { fallbackStore, StoreMemoryVault } from '../services/fallbackStore';

// Helper to assign deterministic stack offsets to a card at a given index
const computeOffsets = (idx: number) => ({
  cardNumber: idx + 1,
  rotation: (idx % 2 === 0 ? 1 : -1) * (2 + (idx % 6) * 2.5),
  offsetX: Math.sin(idx * 1.3) * 30,
  offsetY: Math.cos(idx * 1.7) * 20,
});

export const getMemoryVaultCards = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      const items = await MemoryVault.find().sort({ cardNumber: 1, createdAt: 1 });
      res.status(200).json({ success: true, data: items });
    } else {
      res.status(200).json({ success: true, data: fallbackStore.memoryVaultCards });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMemoryVaultCardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const item = await MemoryVault.findById(id);
      if (!item) {
        res.status(404).json({ success: false, message: 'Memory vault card not found.' });
        return;
      }
      res.status(200).json({ success: true, data: item });
    } else {
      const item = fallbackStore.memoryVaultCards.find(c => c._id === id);
      if (!item) {
        res.status(404).json({ success: false, message: 'Memory vault card not found.' });
        return;
      }
      res.status(200).json({ success: true, data: item });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMemoryVaultCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, image, description, category } = req.body;

    if (!title || !image || !category) {
      res.status(400).json({ success: false, message: 'Title, image, and category are required.' });
      return;
    }

    if (isMongoConnected) {
      const count = await MemoryVault.countDocuments();
      const offsets = computeOffsets(count);
      const card = await MemoryVault.create({
        title,
        image,
        description: description || '',
        category,
        ...offsets,
      });
      res.status(201).json({ success: true, message: 'Memory vault card created successfully.', data: card });
    } else {
      const count = fallbackStore.memoryVaultCards.length;
      const offsets = computeOffsets(count);
      const newCard: StoreMemoryVault = {
        _id: 'mv-' + Date.now(),
        title,
        image,
        description: description || '',
        category,
        ...offsets,
        createdAt: new Date().toISOString(),
      };
      fallbackStore.memoryVaultCards.push(newCard);
      res.status(201).json({ success: true, message: 'Memory vault card created successfully.', data: newCard });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMemoryVaultCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, image, description, category } = req.body;

    if (isMongoConnected) {
      const updated = await MemoryVault.findByIdAndUpdate(
        id,
        { title, image, description, category },
        { new: true }
      );
      if (!updated) {
        res.status(404).json({ success: false, message: 'Memory vault card not found.' });
        return;
      }
      res.status(200).json({ success: true, message: 'Memory vault card updated.', data: updated });
    } else {
      const index = fallbackStore.memoryVaultCards.findIndex(c => c._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Memory vault card not found.' });
        return;
      }
      fallbackStore.memoryVaultCards[index] = {
        ...fallbackStore.memoryVaultCards[index],
        title: title ?? fallbackStore.memoryVaultCards[index].title,
        image: image ?? fallbackStore.memoryVaultCards[index].image,
        description: description ?? fallbackStore.memoryVaultCards[index].description,
        category: category ?? fallbackStore.memoryVaultCards[index].category,
      };
      res.status(200).json({ success: true, message: 'Memory vault card updated.', data: fallbackStore.memoryVaultCards[index] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMemoryVaultCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const deleted = await MemoryVault.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Memory vault card not found.' });
        return;
      }
      res.status(200).json({ success: true, message: 'Memory vault card deleted successfully.' });
    } else {
      const index = fallbackStore.memoryVaultCards.findIndex(c => c._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: 'Memory vault card not found.' });
        return;
      }
      fallbackStore.memoryVaultCards.splice(index, 1);
      res.status(200).json({ success: true, message: 'Memory vault card deleted successfully.' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
