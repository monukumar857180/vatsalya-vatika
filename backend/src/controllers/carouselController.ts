import { Request, Response } from 'express';
import CarouselImage from '../models/CarouselImage';

// GET all images (admin gets all, public gets only active)
export const getCarouselImages = async (req: Request, res: Response) => {
  try {
    const isAdmin = (req as any).user?.role === 'admin';
    const query = isAdmin ? {} : { isActive: true };
    const images = await CarouselImage.find(query).sort({ order: 1, createdAt: -1 });

    if (images.length > 0) {
      return res.status(200).json({ success: true, data: images });
    }

    // Default seeded fallback items if database is freshly started
    const defaults = [
      {
        _id: 'car-seed-1',
        title: 'Together in Faith and Tradition',
        description: 'Sacred ceremonies, spiritual values, and daily prayer unifying our students and community.',
        category: 'Tradition',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        isActive: true,
        order: 0
      },
      {
        _id: 'car-seed-2',
        title: 'Guiding Light of Knowledge',
        description: 'Nurturing young minds through dedicated mentoring, holistic education, and character building.',
        category: 'Education',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        isActive: true,
        order: 1
      },
      {
        _id: 'car-seed-3',
        title: 'Youth, Athletics & Brotherhood',
        description: 'Building vitality, endurance, and teamwork on the sprawling sports fields of the Ashram.',
        category: 'Activities',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
        isActive: true,
        order: 2
      },
      {
        _id: 'car-seed-4',
        title: 'Serene Sanctuary for Growth',
        description: 'Peaceful natural ambiance fostering meditation, inner clarity, and wholesome living.',
        category: 'Campus',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
        isActive: true,
        order: 3
      }
    ];

    res.status(200).json({ success: true, data: defaults });
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
