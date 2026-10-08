require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Initial Database Connection Call
connectDB();

const app = express();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// CORS Configuration
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Ensure Database is connected on each incoming serverless invocation
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Basic Health Check Routes
app.get(['/', '/api'], (req, res) => {
  res.send('Skill Gap Analysis API is running...');
});

// Import and register routes with and without /api prefix for maximum serverless compatibility
const registerRoutes = (prefix) => {
  app.use(`${prefix}/auth`, require('./routes/authRoutes'));
  app.use(`${prefix}/skills`, require('./routes/skillRoutes'));
  app.use(`${prefix}/jobs`, require('./routes/jobRoutes'));
  app.use(`${prefix}/analysis`, require('./routes/analysisRoutes'));
  app.use(`${prefix}/job-postings`, require('./routes/jobPostingRoutes'));
  app.use(`${prefix}/applications`, require('./routes/applicationRoutes'));
  app.use(`${prefix}/messages`, require('./routes/messageRoutes'));
};

registerRoutes('/api');
registerRoutes('');

if (process.env.NODE_ENV !== 'production' || require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

