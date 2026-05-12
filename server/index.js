const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Rudra Construction ERP API is running' });
});

// Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Project Routes
app.use('/api/projects', require('./routes/projectRoutes'));

// CMS Routes
app.use('/api/cms', require('./routes/cmsRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
