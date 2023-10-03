const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const postsRoutes = require('./Routes/postsRoutes');

const app = express();

app.use('/', postsRoutes);

mongoose.connect('mongodb+srv://sandhya:sandhya@cluster0.ohd4bw4.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});