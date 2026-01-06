const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },

    // 🔥 FIXED CATEGORY
    category: {
      type: String,
      enum: [
        'Consumable Items',
        'Testing Products',
        'Paint & Coating',
      ],
      required: true,
    },

    brand: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
