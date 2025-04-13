import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const router = Router();
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    },
  });

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const newContact = await prisma.contactMessage.create({
      data: { name, email, subject, message }
    });

    const mailOptions = {
        from: `"Portfolio Website" <${process.env.SMTP_USER}>`, // Sender address
        to: process.env.SMTP_USER, // Recipient email address
        subject: `New Contact Message: ${subject}`,
        text: `You have a new contact message from ${name} (${email}):\n\n${message}`,
        html: `<p>You have a new contact message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
      };
  
      await transporter.sendMail(mailOptions);

    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create contact message' });
  }
});

export default router;
