require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');

connectDB();

const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: false
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use('/api', limiter);

// CORS
app.use(cors({
  origin: true,
  credentials: true
}));

// Body parser
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.send('Skill Gap Analysis API is running...');
});

app.get('/api', (req, res) => {
  res.send('Skill Gap Analysis API is running...');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/analysis', require('./routes/analysisRoutes'));
app.use('/api/job-postings', require('./routes/jobPostingRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
