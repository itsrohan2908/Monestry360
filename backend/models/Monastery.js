const mongoose = require('mongoose');

const monasterySchema = new mongoose.Schema({
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  established: String,
  visitingInfo: String,
  images: [String],
  streetView: String
});

module.exports = mongoose.model('Monastery', monasterySchema);
