const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { saveUserSkills, analyzeSkillGap, parseResume } = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/user-skills', protect, saveUserSkills);
router.get('/gap/:jobId', protect, analyzeSkillGap);
router.post('/parse-resume', protect, upload.single('resume'), parseResume);
=======
const { saveUserSkills, analyzeSkillGap } = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

router.post('/user-skills', protect, saveUserSkills);
router.get('/gap/:jobId', protect, analyzeSkillGap);
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8

module.exports = router;
