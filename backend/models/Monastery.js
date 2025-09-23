const mongoose = require('mongoose');

const monasterySchema = new mongoose.Schema({
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  established: String,
  visitingInfo: String,
  images: [String]
});

module.exports = mongoose.model('Monastery', monasterySchema);
