import nodemailer from 'nodemailer';
import { config } from '../config/environment';
import { isMongoConnected } from '../config/db';
import { Activity, ActivityType } from '../models/Activity';
import { fallbackStore } from './fallbackStore';

// ============================================================
//  LOG ACTIVITY — saves to DB or fallbackStore
// ============================================================
export const logActivity = async (
  type: ActivityType,
  title: string,
  description: string,
  metadata: Record<string, any> = {}
): Promise<void> => {
  try {
    if (isMongoConnected) {
      await Activity.create({ type, title, description, metadata, isRead: false });
    } else {
      fallbackStore.activities.unshift({
        _id: `act-${Date.now()}`,
        type,
        title,
        description,
        metadata,
        isRead: false,
        createdAt: new Date().toISOString()
      });
      // Keep only last 500 in memory
      if (fallbackStore.activities.length > 500) {
        fallbackStore.activities = fallbackStore.activities.slice(0, 500);
      }
    }

    // Fire Email alert without blocking the main response
    sendEmailAlert(title, description, metadata).catch((err: any) => {
      console.error('[Email Alert] Background send failed:', err?.message || err);
    });
  } catch (err) {
    console.error('[ActivityService] Failed to log activity:', err);
  }
};

// ============================================================
//  EMAIL ALERTS VIA SMTP (Gmail app password recommended)
// ============================================================
const sendEmailAlert = async (
  title: string,
  description: string,
  metadata: Record<string, any>
): Promise<void> => {
  const { emailHost, emailPort, emailUser, emailPass, emailTo } = config;

  if (!emailUser || !emailPass) {
    console.warn('[Email Alert] Skipping — emailUser or emailPass not configured in .env');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailPort === 465, // true for 465, false for 587
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const now = new Date().toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
    timeZone: 'Asia/Kolkata'
  });

  let emailHtml = `
    <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto; background-color: #fcfcfc;">
      <h2 style="color: #ea580c; margin-top: 0;">🔔 Notification: ${title}</h2>
      <p style="font-size: 15px; color: #333; line-height: 1.5;">${description}</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
      <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; font-weight: bold; color: #666; width: 120px;">Time:</td>
          <td style="padding: 6px 0; color: #111;">${now}</td>
        </tr>
  `;

  if (metadata.amount) {
    emailHtml += `
        <tr>
          <td style="padding: 6px 0; font-weight: bold; color: #666;">Amount:</td>
          <td style="padding: 6px 0; color: #ea580c; font-weight: bold; font-size: 16px;">₹${metadata.amount}</td>
        </tr>
    `;
  }

  if (metadata.name) {
    emailHtml += `
        <tr>
          <td style="padding: 6px 0; font-weight: bold; color: #666;">User Name:</td>
          <td style="padding: 6px 0; color: #111;">${metadata.name}</td>
        </tr>
    `;
  }

  if (metadata.email) {
    emailHtml += `
        <tr>
          <td style="padding: 6px 0; font-weight: bold; color: #666;">User Email:</td>
          <td style="padding: 6px 0; color: #111;">${metadata.email}</td>
        </tr>
    `;
  }

  emailHtml += `
      </table>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
      <p style="font-size: 13px; color: #666; margin-bottom: 0;">Please check the Admin Portal dashboard for complete details.</p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Vatsalya Vatika Alerts" <${emailUser}>`,
      to: emailTo,
      subject: `🔔 Ashram Alert: ${title}`,
      html: emailHtml,
    });
    console.log(`[Email Alert] ✅ Email sent successfully to ${emailTo} | MessageId: ${info.messageId}`);
  } catch (err: any) {
    console.error('[Email Alert] ❌ Failed to send email:', err.message);
  }
};
