const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { getSkills, addSkill, deleteSkill } = require('../controllers/skillController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getSkills);
router.post('/', protect, authorize('recruiter'), addSkill);
router.delete('/:id', protect, authorize('recruiter'), deleteSkill);
=======
const { getSkills } = require('../controllers/skillController');

router.get('/', getSkills);
>>>>>>> 6c7adeaeb4836fa618e94ec15740d9f70d0104d8

module.exports = router;
