import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isMongoConnected } from '../config/db';
import { User } from '../models/User';
import { fallbackStore } from '../services/fallbackStore';
import { config } from '../config/environment';
import { AuthRequest } from '../middleware/authMiddleware';
import { logActivity } from '../services/notificationService';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password.'
      });
      return;
    }

    if (isMongoConnected) {
      const user = await User.findOne({
        $or: [
          { email: email.toLowerCase() },
          { name: { $regex: new RegExp(`^${email}$`, 'i') } }
        ]
      });
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials.'
        });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials.'
        });
        return;
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        success: true,
        message: 'Authentication successful.',
        token,
        user: { name: user.name, email: user.email, role: user.role }
      });
      logActivity('login', '🔐 User Login', `${user.name} logged in.`, { name: user.name, email: user.email }).catch(() => {});
      return;
    } else {
      // Fallback auth
      const identifier = email.toLowerCase();
      const user = fallbackStore.users.find(u => 
        u.email.toLowerCase() === identifier || 
        u.name.toLowerCase() === identifier
      );
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials.'
        });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials.'
        });
        return;
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        success: true,
        message: 'Authentication successful.',
        token,
        user: { name: user.name, email: user.email, role: user.role }
      });
      logActivity('login', '🔐 User Login', `${user.name} logged in.`, { name: user.name, email: user.email }).catch(() => {});
      return;
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Login failed.'
    });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;

    // Simple robust validation messages
    if (!name || name.trim().length < 2) {
      res.status(400).json({ success: false, message: 'Name must be at least 2 characters long.' });
      return;
    }
    if (!email || !/^(?:(?![^@]*\.{2})[a-zA-Z0-9._%+-]+@(?!gmail\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?![.])(?!.*[.]{2})[a-zA-Z0-9.]{6,30}(?<![.])@gmail\.com)$/i.test(email)) {
      res.status(400).json({ success: false, message: 'Please enter a valid email address. Random or sub-addressed Gmail addresses are not allowed.' });
      return;
    }
    if (!password || password.length < 8) {
      res.status(400).json({ success: false, message: 'Password must be at least 8 characters long.' });
      return;
    }
    if (phone && !/^(?:\+?\d{1,3}[- ]?)?\d{10}$/.test(phone)) {
      res.status(400).json({ success: false, message: 'Please enter a valid 10-digit phone number.' });
      return;
    }

    const lowerEmail = email.toLowerCase();

    if (isMongoConnected) {
      const existingUser = await User.findOne({ email: lowerEmail });
      if (existingUser) {
        res.status(400).json({ success: false, message: 'This email is already registered.' });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email: lowerEmail,
        password: hashedPassword,
        phone,
        role: 'user'
      });

      res.status(201).json({
        success: true,
        message: 'Registration successful! Welcome to Vatsalya Vatika community.',
        user: { name: user.name, email: user.email, role: user.role }
      });
      logActivity('signup', '🆕 New User Signup', `${name} registered a new account.`, { name, email: lowerEmail }).catch(() => {});
      return;
    } else {
      const existingUser = fallbackStore.users.find(u => u.email.toLowerCase() === lowerEmail);
      if (existingUser) {
        res.status(400).json({ success: false, message: 'This email is already registered.' });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        _id: 'user-' + Date.now(),
        name,
        email: lowerEmail,
        passwordHash: hashedPassword,
        phone,
        role: 'user' as const,
        createdAt: new Date().toISOString()
      };
      fallbackStore.users.push(newUser);

      res.status(201).json({
        success: true,
        message: 'Registration successful! Welcome to Vatsalya Vatika community.',
        user: { name: newUser.name, email: newUser.email, role: newUser.role }
      });
      logActivity('signup', '🆕 New User Signup', `${name} registered a new account.`, { name, email: lowerEmail }).catch(() => {});
      return;
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed.'
    });
  }
};

export const getRegisteredUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isMongoConnected) {
      const users = await User.find({}, '-password').sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: users
      });
    } else {
      const users = fallbackStore.users.map(({ passwordHash, ...rest }) => rest);
      res.status(200).json({
        success: true,
        data: users
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve users.'
    });
  }
};
