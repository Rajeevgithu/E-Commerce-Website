const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Admin'          // ✅ default
  },
  category: {
    type: String,
    default: 'General'        // ✅ default
  },
  image: {
    type: String,
    required: false
  },
  excerpt: {
    type: String             // ❌ not required
  },
  readTime: {
    type: String             // ❌ not required
  },
  published: {
    type: Boolean,
    default: false           // ✅ REQUIRED for admin/user flow
  },
  date: {
    type: String,
    default: () =>
      new Date().toISOString().split('T')[0] // ✅ auto date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
