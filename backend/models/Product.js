const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  brand: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
