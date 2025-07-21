const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const progressRoutes = require('./routes/progressRoutes');
const adminStatsRoutes = require('./routes/adminStatRoutes');




dotenv.config();

const app = express();
app.use(express.json())
const allowedOrigins = ['http://localhost:8080'];

app.use(cors({
  origin:"*"
}));

app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoutes)
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/admin/stats', adminStatsRoutes);






const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_PRODUCTION)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));