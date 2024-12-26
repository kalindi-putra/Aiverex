const express = require('express');
const router = express.Router();
const { registerMentor } = require('../Controllers/MentorRegistration');
const { registerStudent } = require('../Controllers/StudentRegistration');
const { login } = require('../Controllers/authController');

router.post('/mentor/register', registerMentor);
router.post('/student/register', registerStudent);
router.post('/login', login);

module.exports = router;
