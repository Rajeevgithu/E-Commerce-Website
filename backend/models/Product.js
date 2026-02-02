const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    // ❌ price REMOVED
    // price: { type: Number, required: true },
availability: {
  type: Boolean,
  default: true,
},
  
    category: {
      type: String,
      enum: [
        "Consumable Items",
        "Testing Products",
        "Paint & Coating",
        "General",
      ],
      default: "General", // ✅ avoids validation error
    },

    brand: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
