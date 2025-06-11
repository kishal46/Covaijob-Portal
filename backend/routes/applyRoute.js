const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const Job = require('../models/Job');
require('dotenv').config();

const upload = multer({ dest: 'uploads/' });

router.post('/apply', upload.single('resume'), async (req, res) => {
  const { name, email, phone, jobId } = req.body;
  const resumeFile = req.file;

  if (!name || !email || !phone || !resumeFile || !jobId) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const job = await Job.findById(jobId);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'kchannel022@gmail.com',
      subject: `New Job Application - ${job?.title || 'Unknown Job'}`,
      html: `
        <h3>New Job Application Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Job Title:</strong> ${job?.title || jobId}</p>
        <p><strong>Company:</strong> ${job?.company || 'N/A'}</p>
        <p><strong>Description:</strong> ${job?.description || 'N/A'}</p>
      `,
      attachments: [
        {
          filename: resumeFile.originalname,
          path: resumeFile.path,
        },
      ],
    });

    fs.unlinkSync(resumeFile.path);

    res.status(200).json({ message: 'Application sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;