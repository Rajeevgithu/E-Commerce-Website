import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const galleryImages = [
  {
    id: 1,
    category: 'Testing Equipment',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    title: 'Advanced Testing Lab',
    description: 'State-of-the-art testing equipment in our laboratory',
    details: 'Our advanced testing laboratory is equipped with the latest technology for precise and accurate testing of textile materials. The facility includes specialized equipment for tensile strength, abrasion resistance, and color fastness testing.'
  },
  {
    id: 2,
    category: 'Products',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    title: 'Quality Control',
    description: 'Our quality control process in action',
    details: 'Our dedicated quality control team ensures that every product meets international standards. The process includes rigorous testing and verification at multiple stages of production.'
  },
  {
    id: 3,
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    title: 'Industry Exhibition',
    description: 'Representing at the annual textile industry exhibition',
    details: 'We regularly participate in industry exhibitions to showcase our latest innovations and connect with industry professionals. These events provide valuable opportunities for networking and knowledge sharing.'
  },
  {
    id: 4,
    category: 'Testing Equipment',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    title: 'Lab Setup',
    description: 'Modern laboratory setup for textile testing',
    details: 'Our laboratory is designed to provide optimal conditions for textile testing. The setup includes climate control systems, specialized lighting, and ergonomic workstations for our technicians.'
  },
  {
    id: 5,
    category: 'Products',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    title: 'Product Showcase',
    description: 'Latest testing instruments on display',
    details: 'Our product showcase features the latest innovations in testing equipment. Each instrument is designed to meet specific industry requirements and standards.'
  },
  {
    id: 6,
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500',
    title: 'Team Training',
    description: 'Regular training sessions for our technical team',
    details: 'We invest in continuous training for our technical team to ensure they are up-to-date with the latest testing methodologies and equipment operation.'
  }
];

const categories = ['All', 'Testing Equipment', 'Products', 'Events'];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our state-of-the-art facilities, products, and events through our comprehensive gallery
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white"
              onClick={() => {
                setSelectedImage(item);
                setCurrentIndex(filteredImages.findIndex(img => img.id === item.id));
              }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                  <div className="mt-4 flex items-center justify-center">
                    <FaSearch className="text-2xl" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full bg-white rounded-xl overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={filteredImages[currentIndex].image}
                    alt={filteredImages[currentIndex].title}
                    className="w-full h-[70vh] object-cover"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
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
                      {filteredImages[currentIndex].category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{filteredImages[currentIndex].title}</h2>
                  <p className="text-gray-600 mb-4">{filteredImages[currentIndex].description}</p>
                  <p className="text-gray-700">{filteredImages[currentIndex].details}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery; 