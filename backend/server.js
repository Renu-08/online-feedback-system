const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedback');

const app = express();

connectDB();

app.use(cors());
app.use(express.json()); 

app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
