import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db';
import { Review } from '../models/Review';
import { fallbackStore } from '../services/fallbackStore';
import { logActivity } from '../services/notificationService';

// POST /api/reviews — Public: submit a review
export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, rating, comment } = req.body;

    const numRating = Number(rating);
    if (!name || !comment) {
      res.status(400).json({ success: false, message: 'Name and comment are required.' });
      return;
    }
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      res.status(400).json({ success: false, message: 'Rating must be a number between 1 and 5.' });
      return;
    }
    if (comment.trim().length < 10) {
      res.status(400).json({ success: false, message: 'Comment must be at least 10 characters long.' });
      return;
    }

    if (isMongoConnected) {
      const review = await Review.create({ name, email, rating: numRating, comment, approved: true });
      res.status(201).json({ success: true, message: 'Thank you for your review!', data: review });
      logActivity('review', '⭐ New Review Submitted', `${name} gave ${numRating} stars: "${comment.slice(0, 60)}..."`, { name, email, rating: numRating }).catch(() => {});
    } else {
      const newReview = {
        _id: 'rev-' + Date.now(),
        name,
        email: email || undefined,
        rating: numRating,
        comment,
        approved: true,
        createdAt: new Date().toISOString()
      };
      fallbackStore.reviews.unshift(newReview);
      res.status(201).json({ success: true, message: 'Thank you for your review!', data: newReview });
      logActivity('review', '⭐ New Review Submitted', `${name} gave ${numRating} stars: "${comment.slice(0, 60)}"`, { name, email, rating: numRating }).catch(() => {});
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Unable to submit your review. Please try again.' });
  }
};

// GET /api/reviews — Public: get all approved reviews
export const getPublicReviews = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      const items = await Review.find({ approved: true }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: items });
    } else {
      const approved = fallbackStore.reviews.filter(r => r.approved);
      res.status(200).json({ success: true, data: approved });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/reviews/all — Admin: get ALL reviews (including unapproved)
export const getAllReviews = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      const items = await Review.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: items });
    } else {
      res.status(200).json({ success: true, data: fallbackStore.reviews });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/reviews/:id/toggle — Admin: toggle approved status
export const toggleReviewApproval = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const review = await Review.findById(id);
      if (!review) {
        res.status(404).json({ success: false, message: 'Review not found.' });
        return;
      }
      review.approved = !review.approved;
      await review.save();
      res.status(200).json({ success: true, message: `Review ${review.approved ? 'approved' : 'hidden'}.`, data: review });
    } else {
      const r = fallbackStore.reviews.find(rv => rv._id === id);
      if (!r) {
        res.status(404).json({ success: false, message: 'Review not found.' });
        return;
      }
      r.approved = !r.approved;
      res.status(200).json({ success: true, message: `Review ${r.approved ? 'approved' : 'hidden'}.`, data: r });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/reviews/:id — Admin: delete review
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      const deleted = await Review.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Review not found.' });
        return;
      }
      res.status(200).json({ success: true, message: 'Review deleted.' });
    } else {
      const idx = fallbackStore.reviews.findIndex(r => r._id === id);
      if (idx === -1) {
        res.status(404).json({ success: false, message: 'Review not found.' });
        return;
      }
      fallbackStore.reviews.splice(idx, 1);
      res.status(200).json({ success: true, message: 'Review deleted.' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
