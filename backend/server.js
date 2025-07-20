const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes')
const progressRoutes = require('./routes/progressRoutes')



dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoutes)
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes)
app.use('/api/progress', progressRoutes)






const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));