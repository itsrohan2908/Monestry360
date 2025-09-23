require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(MONGO_URL)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('MongoDB connection error:', err));
});