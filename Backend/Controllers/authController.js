const bcrypt = require('bcryptjs');
const prisma = require('../lib/prisma');

const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required' });
  }

  try {
    let user;

    if (role === 'mentor') {
      user = await prisma.mentor.findUnique({
        where: { email },
      });
    } 
    else if (role === 'student') {
      user = await prisma.student.findUnique({
        where: { email },
      });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

module.exports = { login };
