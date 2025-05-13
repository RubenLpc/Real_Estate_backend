import express from 'express';
import nodemailer from 'nodemailer';
import { sendEmail } from '../controllers/mailCntrl.js';

const router = express.Router();

router.post('/send', sendEmail)

export { router as mailRoute };