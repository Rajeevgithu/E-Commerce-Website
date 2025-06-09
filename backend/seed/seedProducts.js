// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const connectDB = require('../config/db');

dotenv.config();

const consumableProducts = [
  {
    name: 'AATCC ALL STD',
    image: '/uploads/product1.png',
    description: 'Description for consumable product 1',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'SDC MULTIFIBER-DW',
    image: '/uploads/product5.png',
    description: 'Description for consumable product 2',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'AATC & ISO CROCKING CLOTH',
    image: '/uploads/product6.png',
    description: 'Description for consumable product 3',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'SDC Cotton Limbric',
    image: '/uploads/product15.png',
    description: 'Description for consumable product 4',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'AATCC UV Calibration Fabric',
    image: '/uploads/product20.png',
    description: 'Description for consumable product 5',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'SDC Phenolic Yellowing',
    image: '/uploads/product30.png',
    description: 'Description for consumable product 6',
    brand: 'SDC',
    category: 'Consumable Items',
  },
];

const testingProducts = [
  {
    name: 'Testing Product 1',
    image: '/uploads/product40.png',
    description: 'Description for testing product 1',
    brand: 'Brand X',
    category: 'Testing Machine',
    price: 200,
    countInStock: 10,
  },
  {
    name: 'Testing Product 2',
    image: '/uploads/product50.png',
    description: 'Description for testing product 2',
    brand: 'Brand Y',
    category: 'Testing Machine',
    price: 250,
    countInStock: 5,
  },
  {
    name: 'Testing Product 3',
    image: '/uploads/product60.png',
    description: 'Description for testing product 3',
    brand: 'Brand Z',
    category: 'Testing Machine',
    price: 300,
    countInStock: 8,
  },
];

const allProducts = [...consumableProducts, ...testingProducts];

const importData = async () => {
  try {
    await connectDB(); // ensure DB connection before seeding

    await Product.deleteMany();
    await Product.insertMany(allProducts);

    console.log('✅ All sample products imported!');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing products:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    console.log('🗑️ All products destroyed!');
    process.exit();
  } catch (error) {
    console.error('❌ Error destroying products:', error);
    process.exit(1);
  }
};

// Use command line argument to determine action
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
