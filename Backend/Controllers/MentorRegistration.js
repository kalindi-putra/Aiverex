const bcrypt = require('bcryptjs');
const prisma = require('../lib/prisma');

const registerMentor = async (req, res) => {
  const { name, email, password, company, experience, resumeLink, githubLink } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const mentor = await prisma.mentor.create({
      data: {
        name,
        email,
        password: hashedPassword,
        company: company || null,
        experience: experience || null,
        resumeLink: resumeLink || null,
        githubLink: githubLink || null,
      },
    });

    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating mentor', error: error });
  }
};

module.exports = { registerMentor };
