import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaTimes, FaChevronLeft, FaChevronRight, FaNewspaper } from 'react-icons/fa';

const newsItems = [
  {
    id: 1,
    title: 'New Testing Equipment Launch',
    excerpt: 'Introducing our latest range of advanced textile testing equipment designed for precision and efficiency.',
    content: `We are excited to announce the launch of our new range of textile testing equipment. This state-of-the-art equipment represents a significant advancement in testing technology, offering unprecedented accuracy and efficiency.

Key features include:
- Automated testing processes
- Real-time data analysis
- Enhanced accuracy and repeatability
- Reduced testing time
- Improved user interface

The new equipment is now available for demonstration at our facility.`,
    date: 'March 20, 2024',
    category: 'Company News',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    featured: true
  },
  {
    id: 2,
    title: 'Industry Certification Achieved',
    excerpt: 'Our laboratory has received the prestigious ISO 17025 certification for testing competence.',
    content: `We are proud to announce that our testing laboratory has been awarded the ISO 17025 certification. This internationally recognized standard demonstrates our commitment to quality and technical competence in testing.

The certification covers:
- Testing procedures
- Quality management system
- Technical competence
- Equipment calibration
- Staff qualifications

This achievement reinforces our position as a leading provider of textile testing services.`,
    date: 'March 18, 2024',
    category: 'Achievements',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    featured: false
  },
  {
    id: 3,
    title: 'Partnership Announcement',
    excerpt: 'Strategic partnership with leading textile manufacturers to enhance testing capabilities.',
    content: `We are pleased to announce a strategic partnership with several leading textile manufacturers. This collaboration will enhance our testing capabilities and provide more comprehensive services to our clients.

Partnership benefits include:
- Access to advanced testing methodologies
- Shared research and development
- Expanded testing capabilities
- Improved service delivery
- Enhanced industry knowledge

This partnership represents a significant step forward in our commitment to excellence.`,
    date: 'March 15, 2024',
    category: 'Partnerships',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    featured: false
  },
  {
    id: 4,
    title: 'Training Program Launch',
    excerpt: 'New comprehensive training program for textile testing professionals.',
    content: `We are launching a new comprehensive training program for textile testing professionals. This program is designed to enhance skills and knowledge in modern testing methodologies.

Program highlights:
- Hands-on training sessions
- Expert-led workshops
- Certification opportunities
- Latest testing techniques
- Industry best practices

The program will be available starting next month.`,
    date: 'March 12, 2024',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    featured: false
  }
];

const categories = ['All', 'Company News', 'Achievements', 'Partnerships', 'Education'];

const LatestNews = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredNews = selectedCategory === 'All'
    ? newsItems
    : newsItems.filter(item => item.category === selectedCategory);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredNews.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredNews.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Latest News</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about our latest developments, achievements, and industry insights
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

        {/* Featured News */}
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
                    src={newsItems[0].image}
                    alt={newsItems[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {newsItems[0].category}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <FaNewspaper className="text-yellow-400" />
                      Featured Story
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{newsItems[0].title}</h2>
                  <p className="text-gray-600 mb-6">{newsItems[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-yellow-400" />
                      {newsItems[0].date}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedNews(newsItems[0]);
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

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.slice(selectedCategory === 'All' ? 1 : 0).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <FaNewspaper className="text-yellow-400" />
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-yellow-400" />
                    {item.date}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedNews(item);
                    setCurrentIndex(filteredNews.findIndex(n => n.id === item.id));
                  }}
                  className="w-full px-4 py-2 bg-yellow-400 text-gray-900 rounded-full hover:bg-yellow-500 transition-colors"
                >
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* News Modal */}
        <AnimatePresence>
          {selectedNews && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedNews(null)}
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
                    src={filteredNews[currentIndex].image}
                    alt={filteredNews[currentIndex].title}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setSelectedNews(null)}
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
                      {filteredNews[currentIndex].category}
                    </span>
                    {filteredNews[currentIndex].featured && (
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <FaNewspaper className="text-yellow-400" />
                        Featured Story
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{filteredNews[currentIndex].title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-yellow-400" />
                      {filteredNews[currentIndex].date}
                    </span>
                  </div>
                  <div className="prose max-w-none">
                    {filteredNews[currentIndex].content.split('\n\n').map((paragraph, index) => (
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

export default LatestNews; 