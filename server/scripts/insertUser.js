const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path to your User model

mongoose.connect('mongodb://127.0.0.1:27017/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const insertUser = async () => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('password', saltRounds);

  const user = new User({
    username: 'testuser',
    email: 'testuser@example.com',
    password: hashedPassword,
  });

  await user.save();
  console.log('User inserted');
  mongoose.connection.close();
};

insertUser();
