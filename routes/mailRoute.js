import express from 'express';
import nodemailer from 'nodemailer';
import { sendEmail, sendPropertyContact } from '../controllers/mailCntrl.js';

const router = express.Router();

router.post('/send', sendEmail)
router.post('/send/booking', sendPropertyContact);

export { router as mailRoute };