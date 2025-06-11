require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Uploads directory created.');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

// Multer file storage configuration (if needed elsewhere)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const filename = `${Date.now()}${fileExt}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.pdf'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedTypes.includes(ext)) {
    return cb(new Error('Invalid file type'), false);
  }
  cb(null, true);
};

const auth = require('./routes/auth'); 
const profileRoutes = require('./routes/profile');
const jobRoutes = require('./routes/jobs');
const applyRoute = require('./routes/applyRoute');
const contactRoutes = require('./routes/contactRoute');
const contactFormRoute = require('./routes/contactFormRoute');
const authRoutes = require('./routes/authRoutes');
// const hiredevRoutes = require('./routes/hireDeveloper');


// Mount routes

app.use('/', auth);                       // login, signup
app.use('/jobseeker', profileRoutes);    // job seeker profile
app.use('/jobs', jobRoutes);             // job CRUD
app.use('/', applyRoute);                // job apply
app.use('/', contactRoutes);             // contact message
app.use('/api', contactFormRoute);       // contact form to mail
app.use('/auth', authRoutes);
// app.use('/send-email', hiredevRoutes);

// Server listener
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log("Shutting down server...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});
