const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['candidate', 'recruiter', 'user'],
    default: 'candidate'
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  avatar: {
    type: String,
    default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  },
  theme: {
    type: String,
    default: 'dark'
  },
  history: [{
    jobRole: String,
    jobId: mongoose.Schema.Types.ObjectId,
    matchPercentage: Number,
    atsScore: Number,
    missingSkills: [{ type: String }],
    userSkills: [{ type: String }],
    recommendations: [{
      title: String,
      type: { type: String },
      url: String,
      difficulty: String
    }],
    recommendedJobs: [{
      roleName: String,
      matchPercentage: Number,
      jobId: mongoose.Schema.Types.ObjectId
    }],

    date: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
