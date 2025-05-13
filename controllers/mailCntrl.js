import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

import { Prisma } from "@prisma/client";

export const sendEmail = asyncHandler(async (req, res) => {
    const {
      anrede, vorname, nachname, email,
      telefon, immobilienart, ort, flaeche, nachricht
    } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // sau alt provider
      auth: {
        user: process.env.EMAIL_USER, // adresa de email
        pass: process.env.EMAIL_PASS // ATENȚIE: folosește App Password, nu parola contului
        // ATENȚIE: folosește App Password, nu parola contului
      }
    });
  
    const mailOptions = {
      from: email,
      to: 'lupancuruben2@gmail.com',
      subject: 'Neue Suchanfrage',
      text: `
        Anrede: ${anrede}
        Name: ${vorname} ${nachname}
        E-Mail: ${email}
        Telefon: ${telefon || '-'}
        Immobilienart: ${immobilienart}
        Ort: ${ort}
        Fläche: ${flaeche || '-'}
        Nachricht: ${nachricht || '-'}
      `
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'E-Mail gesendet' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Fehler beim Senden' });
    }
  });
  
