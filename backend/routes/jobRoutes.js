const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { getJobs, addJob, deleteJob } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.post('/', protect, authorize('recruiter'), addJob);
router.delete('/:id', protect, authorize('recruiter'), deleteJob);
=======
const { getJobs } = require('../controllers/jobController');

router.get('/', getJobs);
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8

module.exports = router;
