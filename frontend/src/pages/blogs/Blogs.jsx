import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaClock, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Textile Testing',
    excerpt: 'Exploring the latest advancements in textile testing technology and their impact on the industry.',
    content: `The textile industry is undergoing a significant transformation with the introduction of advanced testing technologies. These innovations are not only improving the accuracy and efficiency of testing processes but are also helping manufacturers meet increasingly stringent quality standards.

Key developments include:
- Automated testing systems that reduce human error
- AI-powered quality control systems
- Real-time data analysis and reporting
- Sustainable testing methods that reduce environmental impact

These advancements are helping companies maintain high quality standards while reducing costs and improving efficiency.`,
    author: 'Dr. Sarah Johnson',
    date: 'March 15, 2024',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Quality Control Best Practices',
    excerpt: 'Essential guidelines for maintaining high standards in textile quality control.',
    content: `Quality control is a critical aspect of textile manufacturing that directly impacts product reliability and customer satisfaction. This comprehensive guide covers the essential practices that every textile manufacturer should implement.

Key areas include:
- Standard operating procedures
- Quality metrics and KPIs
- Testing protocols
- Documentation requirements
- Staff training and certification

By following these best practices, manufacturers can ensure consistent quality across their product lines.`,
    author: 'Michael Chen',
    date: 'March 10, 2024',
    category: 'Quality Control',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'Sustainable Testing Methods',
    excerpt: 'How eco-friendly testing methods are revolutionizing the textile industry.',
    content: `Sustainability is becoming increasingly important in the textile industry, and testing methods are no exception. This article explores how manufacturers are adopting eco-friendly testing practices without compromising on quality or accuracy.

Topics covered:
- Water-saving testing techniques
- Energy-efficient equipment
- Waste reduction strategies
- Green certification standards
- Environmental impact assessment

These sustainable practices not only benefit the environment but can also lead to cost savings and improved market positioning.`,
    author: 'Emma Thompson',
    date: 'March 5, 2024',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    readTime: '6 min read'
  }
];

const categories = ['All', 'Technology', 'Quality Control', 'Sustainability'];

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredPosts.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Latest Blog Posts</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and developments in textile testing and quality control
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-yellow-400 text-gray-900 shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Featured Post */}
        {selectedCategory === 'All' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {blogPosts[0].category}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <FaClock className="text-yellow-400" />
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
                  <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-yellow-400" />
                      {blogPosts[0].author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-yellow-400" />
                      {blogPosts[0].date}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPost(blogPosts[0]);
                      setCurrentIndex(0);
                    }}
                    className="mt-6 px-6 py-2 bg-yellow-400 text-gray-900 rounded-full hover:bg-yellow-500 transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(selectedCategory === 'All' ? 1 : 0).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <FaClock className="text-yellow-400" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <FaUser className="text-yellow-400" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-yellow-400" />
                    {post.date}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedPost(post);
                    setCurrentIndex(filteredPosts.findIndex(p => p.id === post.id));
                  }}
                  className="w-full px-4 py-2 bg-yellow-400 text-gray-900 rounded-full hover:bg-yellow-500 transition-colors"
                >
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blog Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={filteredPosts[currentIndex].image}
                    alt={filteredPosts[currentIndex].title}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                  >
                    <FaTimes size={24} />
                  </button>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                  >
                    <FaChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                  >
                    <FaChevronRight size={24} />
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {filteredPosts[currentIndex].category}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <FaClock className="text-yellow-400" />
                      {filteredPosts[currentIndex].readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{filteredPosts[currentIndex].title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-yellow-400" />
                      {filteredPosts[currentIndex].author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-yellow-400" />
                      {filteredPosts[currentIndex].date}
                    </span>
                  </div>
                  <div className="prose max-w-none">
                    {filteredPosts[currentIndex].content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Blogs; 