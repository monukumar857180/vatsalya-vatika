import { Request, Response } from 'express';
import CarouselImage from '../models/CarouselImage';

// GET all images (admin gets all, public gets only active)
export const getCarouselImages = async (req: Request, res: Response) => {
  try {
    const isAdmin = (req as any).user?.role === 'admin';
    const query = isAdmin ? {} : { isActive: true };
    const images = await CarouselImage.find(query).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: images });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST add new image (Admin only)
export const addCarouselImage = async (req: Request, res: Response) => {
  try {
    const { image, title, description, category, date, isActive, order } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }
    
    // Auto-increment order if not provided
    let newOrder = order;
    if (newOrder === undefined) {
      const lastImage = await CarouselImage.findOne().sort({ order: -1 });
      newOrder = lastImage ? lastImage.order + 1 : 0;
    }

    const newImage = new CarouselImage({
      image,
      title,
      description,
      category,
      date,
      isActive: isActive !== undefined ? isActive : true,
      order: newOrder
    });

    await newImage.save();
    res.status(201).json({ success: true, data: newImage });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update image (Admin only)
export const updateCarouselImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { image, title, description, category, date, isActive, order } = req.body;

    const updatedImage = await CarouselImage.findByIdAndUpdate(
      id,
      { image, title, description, category, date, isActive, order },
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    res.status(200).json({ success: true, data: updatedImage });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE image (Admin only)
export const deleteCarouselImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedImage = await CarouselImage.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    res.status(200).json({ success: true, message: 'Image deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT reorder images (Admin only)
export const reorderCarouselImages = async (req: Request, res: Response) => {
  try {
    const { orderedIds } = req.body; // Array of image IDs in the new order
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ success: false, message: 'orderedIds must be an array' });
    }

    // Bulk update the order of each item
    const bulkOps = orderedIds.map((id: string, index: number) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index }
      }
    }));

    if (bulkOps.length > 0) {
      await CarouselImage.bulkWrite(bulkOps);
    }

    // Return the updated list
    const images = await CarouselImage.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: images });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
