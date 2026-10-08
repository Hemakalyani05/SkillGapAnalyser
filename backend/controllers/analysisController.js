const JobRole = require('../models/JobRole');
const Skill = require('../models/Skill');
const UserSkill = require('../models/UserSkill');
const Recommendation = require('../models/Recommendation');
const User = require('../models/User');
const pdfParse = require('pdf-parse');

// Save user skills
const saveUserSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    const userId = req.user.id;

    await UserSkill.deleteMany({ userId });

    const userSkillsToSave = skills.map(skillId => ({
      userId,
      skillId,
      proficiencyLevel: 'Beginner'
    }));

    await UserSkill.insertMany(userSkillsToSave);

    res.status(200).json({
      message: 'User skills saved successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Analyze skill gap
const analyzeSkillGap = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    // Get job
    const JobPosting = require('../models/JobPosting');

    let job = await JobPosting.findById(jobId)
      .populate('requiredSkills');

    // Fallback to JobRole
    if (!job) {
      job = await JobRole.findById(jobId)
        .populate('requiredSkills');
    }

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    const requiredSkills = job.requiredSkills;

    // Get user skills
    const userSkillsData = await UserSkill.find({
      userId
    }).populate('skillId');

    const userSkills = userSkillsData.map(
      us => us.skillId._id.toString()
    );

    // Find missing skills
    const missingSkills = requiredSkills.filter(
      requiredSkill =>
        !userSkills.includes(
          requiredSkill._id.toString()
        )
    );

    const matchedCount =
      requiredSkills.length - missingSkills.length;

    const matchPercentage =
      requiredSkills.length === 0
        ? 100
        : Math.round(
            (matchedCount / requiredSkills.length) * 100
          );

    // Calculate ATS score
    const totalAvailableSkillsCount =
      await Skill.countDocuments();

    const extraSkillsCount =
      userSkills.length - matchedCount;

    let atsScore = 0;

    if (requiredSkills.length > 0) {
      atsScore +=
        (matchedCount / requiredSkills.length) * 80;
    }

    if (totalAvailableSkillsCount > 0) {
      atsScore +=
        (extraSkillsCount /
          totalAvailableSkillsCount) * 20;
    }

    atsScore = Math.min(
      100,
      Math.round(atsScore)
    );

    // Recommendations
    const recommendations = [];

    for (const skill of missingSkills) {
      const skillRecommendations =
        await Recommendation.find({
          skillId: skill._id
        });

      recommendations.push(
        ...skillRecommendations
      );
    }

    // Recommended jobs
    const allJobs = await JobRole.find({
      _id: { $ne: jobId }
    }).populate('requiredSkills');

    const recommendedJobs = [];

    for (const altJob of allJobs) {
      if (
        !altJob.requiredSkills ||
        altJob.requiredSkills.length === 0
      ) {
        continue;
      }

      const altRequired =
        altJob.requiredSkills;

      const altMissing =
        altRequired.filter(
          reqSkill =>
            !userSkills.includes(
              reqSkill._id.toString()
            )
        );

      const altMatchedCount =
        altRequired.length -
        altMissing.length;

      const altMatchPercentage =
        Math.round(
          (altMatchedCount /
            altRequired.length) * 100
        );

      if (
        altMatchPercentage >=
        matchPercentage
      ) {
        recommendedJobs.push({
          _id: altJob._id,
          roleName: altJob.roleName,
          matchPercentage:
            altMatchPercentage
        });
      }
    }

    recommendedJobs.sort(
      (a, b) =>
        b.matchPercentage -
        a.matchPercentage
    );

    // Save history
    const userForHistory =
      await User.findById(userId);

    const lastHistory =
      userForHistory.history &&
      userForHistory.history.length > 0
        ? userForHistory.history[
            userForHistory.history.length - 1
          ]
        : null;

    const isDuplicate =
      lastHistory &&
      lastHistory.jobId &&
      lastHistory.jobId.toString() ===
        job._id.toString() &&
      Date.now() -
        new Date(lastHistory.date).getTime() <
        5000;

    if (!isDuplicate) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          history: {
            jobRole:
              job.title || job.roleName,
            jobId: job._id,
            matchPercentage,
            atsScore,
            missingSkills:
              missingSkills.map(
                s => s.name
              ),
            userSkills:
              userSkillsData.map(
                us => us.skillId.name
              ),
            recommendations:
              recommendations.map(r => ({
                title: r.title,
                type: r.type,
                url: r.url,
                difficulty:
                  r.difficulty ||
                  'Beginner'
              })),
            recommendedJobs:
              recommendedJobs.map(rj => ({
                roleName: rj.roleName,
                matchPercentage:
                  rj.matchPercentage,
                jobId: rj._id
              }))
          }
        }
      });
    }

    res.status(200).json({
      jobRole:
        job.title || job.roleName,
      requiredSkills,
      userSkills:
        userSkillsData.map(
          us => us.skillId
        ),
      missingSkills,
      matchPercentage,
      atsScore,
      recommendations,
      recommendedJobs
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Parse resume PDF
const parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No resume file uploaded'
      });
    }

    const pdfData =
      await pdfParse(req.file.buffer);

    const text = pdfData.text;

    const allSkills =
      await Skill.find();

    const extractedSkillIds = [];

    allSkills.forEach(skill => {
      const escapedSkillName =
        skill.name.replace(
          /[.*+?^${}()|[\]\\]/g,
          '\\$&'
        );

      const regex = new RegExp(
        `\\b${escapedSkillName}\\b`,
        'i'
      );

      if (regex.test(text)) {
        extractedSkillIds.push(
          skill._id.toString()
        );
      }
    });

    res.status(200).json({
      message:
        'Resume parsed successfully',
      extractedSkillIds
    });

  } catch (error) {
    console.error(
      'CRITICAL PDF ERROR:',
      error
    );

    res.status(500).json({
      message:
        'Failed to parse resume: ' +
        error.message
    });
  }
};

module.exports = {
  saveUserSkills,
  analyzeSkillGap,
  parseResume
};
