const bcrypt = require('bcryptjs');
const prisma = require('../lib/prisma');

const registerStudent = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error: error });
  }
};

module.exports = { registerStudent };
