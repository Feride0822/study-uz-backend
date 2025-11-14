const sequelize = require('./config/db');

sequelize.authenticate()
  .then(() => console.log('MySQL connected successfully!'))
  .catch((err) => console.error('Unable to connect to MySQL:', err));

  const express = require('express');
  const app = express();
  const userRoutes = require('./routes/users');
  
  app.use(express.json());
  app.use('/users', userRoutes);
  
  app.listen(3000, () => {
      console.log('Server running on port 3000');
  });
  
  const express = require('express');

app.use(express.json());

app.use('/universities', require('./routes/universities'));
app.use('/faculties', require('./routes/faculties'));
app.use('/programs', require('./routes/programs'));
app.use('/students', require('./routes/students'));
app.use('/courses', require('./routes/courses'));
app.use('/enrollments', require('./routes/enrollments'));

app.listen(3000, () => console.log('Server running on port 3000'));

