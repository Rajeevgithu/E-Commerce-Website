// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const connectDB = require('../config/db');

dotenv.config();

const consumableProducts = [
  {
    name: 'SDC Phenolic Yellowing Test Paper',
    image: '/uploads/product6.jpg',
    description: 'Make- United Kingdom',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'Philips ',
    image: '/uploads/product35.jpg',
    description: 'D65/TL84/CWF/U30/U35 (Make - Poland)',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'Whatman Filter Paper',
    image: ['/uploads/product8.jpg',
            '/uploads/product8.1.jpg',
            '/uploads/product8.2.jpg'
           ],
    description: 'Whatman Filter Paper for precise filtration',
    brand: 'Whatman',
    category: 'Consumable Items',
  },
  {
    name: 'TSF ISO Multifiber Fabric 42 ( Make - USA)',
    image: '/uploads/product27.jpg',
    description: 'TSF ISO Multifiber Fabric 42 (DW) for testing',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  { 
    name: 'SDC Blue Wool 1-8',
    image: '/uploads/product36.jpg',
    description: 'SDC Blue Wool 1-8 ',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'Pantone Book',
    image: ['/uploads/product37.jpg',
            '/uploads/product37.1.jpg',
           ],
    description: 'Pantone Book for color matching',
    brand: 'Pantone',
    category: 'Consumable Items',
  },
  {
    name: 'Thermal strip for Textile Stenter',
    image: '/uploads/product38.jpg',
    description: 'Thermal strip for Textile Stenter Temperature Measurement',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'Silica Crucible Temperature upto 700 °C',
    image: ['/uploads/product2.jpg',
            '/uploads/product2.1.jpg',
            '/uploads/product2.2.jpg'
           ],
    description: 'Silica Crucible for high-temperature applications',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'Stainless Steel Balls',
    image: ['/uploads/product5.jpg',
            '/uploads/product5.1.jpg',
            '/uploads/product5.2.jpg',
            '/uploads/product5.3.jpg',
            '/uploads/product5.4.jpg'
           ],
    description: 'SDC Standard Stainless Steel Balls for Color Fastness Testing (Make -USA)',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'Cork Sheet',
    image: '/uploads/product39.webp',
    description: 'size 3x2 ft, thickness - 10mm',
    category: 'Consumable Items',
  },
  {
    name: 'Acrylic Plate for Color Fastness Testing',
    image: '/uploads/product40.jpg',
    description: 'Acrylic Plate for Color Fastness Testing',
    category: 'Consumable Items',
  },
  {
    name: 'Pantone 4"x4" Swatch',
    image:[ '/uploads/product26.jpg',
            '/uploads/product26.1.jpg',
            '/uploads/product26.2.png'
           ],
    description: 'Pantone 4"x4" Swatch for color matching (Make - USA)',
    category: 'Consumable Items',
  },
  {
    name: 'ISO Crocking Cloth Square 5x5 cm',
    image: ['/uploads/product18.jpg',
            '/uploads/product18.1.jpg',
           ],
    description: 'ISO Crocking Cloth Square 5x5 cm for color fastness testing',
    category: 'Consumable Items',
  },
  {
    name: 'Round GSM Cutter',
    image: '/uploads/product41.jpg',
    description: 'Round GSM Cutter for precise cutting (Make - TTE)',
    category: 'Consumable Items',
  },
  {
    name: 'AATCC UV Calibration Standard',
    image: '/uploads/product20.jpg',
    description: 'AATCC UV Calibration Standard for testing UV resistance (Make - USA)',
    category: 'Consumable Items',
  },
  {
    name: 'AATCC Grey Scale for Staining',
    image: ['/uploads/product21.jpg',
            '/uploads/product22.jpg',
           ],
    description: 'AATCC Grey Scale for Staining (Make - USA)',
    brand: 'AATCC',
    category: 'Consumable Items',
  },
  {
    name: 'AATCC Grey Scale for Color Change',
    image: ['/uploads/product22.1.jpg',
            '/uploads/product22.2.jpg'
           ],
    description: 'AATCC Grey Scale for Color Change (Make - USA)',
    brand: 'AATCC',
    category: 'Consumable Items',
  },//yaha se
  {
    name: 'SDC Wool Abradant Fabric',
    image: ['/uploads/product42.png',
            '/uploads/product42.1.jpg',
           ],
    description: 'SDC Wool Abradant Fabric BS EN ISO 12947-1 (Make - UK)',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'Merck MQuant Total Hardness Test',
    image: ['/uploads/product43.jpg',
            '/uploads/product43.1.jpg',
            '/uploads/product43.2.jpg'
           ],
    description: 'Merck MQuant Total Hardness Test (Make - Germany)',
    brand: 'Merck',
    category: 'Consumable Items',
  },
  {
    name: 'Merck MQuant Peroxide Test 0.5-25 mg',
    image: '/uploads/product28.jpg',
    description: 'Merck MQuant Peroxide Test 0.5-25 mg (Make - Germany)',
    brand: 'Merck',
    category: 'Consumable Items',
  },
  {
    name: 'TSF ISO Crocking Cloth Square 500pcs/pk',
    image: '/uploads/product29.jpg',
    description: 'TSF ISO Crocking Cloth Square 500pcs/pk (Make - USA)',
    category: 'Consumable Items',
  },
  {
    name: 'LUTZ GSM Cutter Blades ',
    image: '/uploads/product44.jpeg',
    description: 'LUTZ GSM Cutter Blades for precise cutting (Make - Germany)',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'TSF ISO BALLAST TYPE 1',
    image: '/uploads/product45.jpeg',
    description: 'TSF ISO BALLAST TYPE 1 (Make - USA)',
    brand: 'TSF',
    category: 'Consumable Items',
  },
  {
    name: 'TSF AATCC Multifiber style 10',
    image: ['/uploads/product31.jpg',
            '/uploads/product31.1.jpg',
           ],
    description: 'TSF AATCC Multifiber style 10 (Make - UK)',
    brand: 'TSF',
    category: 'Consumable Items',
  },
  {
    name: 'SDC ECE Phosphate Reference Detergent (B)',
    image: ['/uploads/product7.jpg',
            '/uploads/product7.1.jpg'
           ],
    description: 'SDC ECE Phosphate Reference Detergent (B) (Make - UK)',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'SDC TAED- Tetraacetylethylenediamine',
    image: '/uploads/product47.webp',
    description: 'SDC TAED- Tetraacetylethylenediamine (Make - UK)',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'Merck Sodium Hydroxide Solution 0.1mol/l',
    image: ['/uploads/product48.jpg',
            '/uploads/product48.1.jpg',
           ],
    description: 'Merck Sodium Hydroxide Solution 0.1mol/l (Make - Germany)',
    brand: 'Merck',
    category: 'Consumable Items',
  },
  {
    name: 'SDC Multifiber DW (Make - UK)',
    image: ['/uploads/product17.jpg',
            '/uploads/product17.1.jpg',
           ],
    description: 'SDC Multifiber DW (Make - UK) for testing',
    brand: 'SDC',
    category: 'Consumable Items',
  },
  {
    name: 'TSF AATCC Crocking Cloth Square 100pcs/pk',
    image: '/uploads/product50.jpeg',
    description: 'TSF AATCC Crocking Cloth Square 100pcs/pk (Make - USA)',
    brand: 'TSF',
    category: 'Consumable Items',
  },
];

const testingProducts = [
  {
    name: ' Thermometer',
    image: ['/uploads/product15.jpg',
           '/uploads/product15.1.jpg',
           '/uploads/product15.2.jpg'
          ],
    description: 'Maximum Thermometer to measure temperature inside the pot 70-150 °C',
    category: 'Testing Products',
  },
  {
    name: 'Merck pH indicator Paper',
    image: ['/uploads/product4.jpg',
            '/uploads/product4.1.jpg'
           ],
    description: 'Merck pH indicator Paper Range 1-14',
    brand: 'Merck',
    category: 'Testing Products',
  },
  {
    name: 'Pocket GSM Weighing Balance',
    image: '/uploads/product51.webp',
    description: 'Pocket GSM Weighing Balance for measuring GSM of fabric',
    category: 'Testing Products',
  },
  {
    name: 'Hydraulic GSM Cutter',
    image: '/uploads/product52.png',
    description: 'Hydraulic GSM Cutter for precise cutting',
    category: 'Testing Products',
  },
  {
    name: 'Crocking Clip',
    image: ['/uploads/product3.jpg',
            '/uploads/product3.1.jpg',
           ],
    description: 'Crocking Clip',
    brand: 'SDC',
    category: 'Testing Products',
  },
  {
    name: 'Laboratory Hot Air Oven',
    image: '/uploads/product53.jpg',
    description: 'Laboratory Hot Air Oven for precise temperature control',
    category: 'Testing Products',
  },
  {
    name: 'Glass Desiccator 240-250mm',
    image: '/uploads/product54.jpg',
    description: 'Glass Desiccator 240-250mm for moisture control',
    category: 'Testing Products',
  },
  {
    name: 'Thermax temperature strip',
    image: '/uploads/product55.webp',
    description: 'Thermax temperature strip for precise temperature control',
    category: 'Testing Products',
  },
  {
    name: 'Reed Pick Glass with Light',
    image: '/uploads/product56.jpg',
    description: 'Reed Pick Glass with Light for precise measurement (Make - TTE)',
    category: 'Testing Products',
  },
  {
    name: 'Merck MQuant Chlorine Test Kit',
    image: '/uploads/product57.png',
    description: 'Merck MQuant Chlorine Test Kit for water quality testing (Make - Germany)',
    brand: 'SDC',
    category: 'Testing Products',
  },
  {
    name: 'Multi Slot Shrinkage Template 250/350/500 mm',
    image: '/uploads/product25.jpg',
    description: 'Multi Slot Shrinkage Template for measuring shrinkage in fabrics (Make - TTE)',
    brand: 'SDC',
    category: 'Testing Products',
  },
  {
    name: 'SDC Grey Scale for Staining ',
    image: '/uploads/product58.webp',
    description: 'SDC Standard Grey Scale for Assessing change in color (Make - UK)',
    brand: 'SDC',
    category: 'Testing Products',
  },
  {
    name: 'Merck MQuant pH indicator strip pH 0-14',
    image: '/uploads/product19.jpg',
    description: 'Merck MQuant pH indicator strip pH 0-14 (Make - Germany)',
    brand: 'Merck',
    category: 'Testing Products',
  },
  {
    name: ' Rankem Universal Indicator Solution pH 4-11',
    image: '/uploads/product59.webp',
    description: 'Rankem Universal Indicator Solution pH 4-11 ',
    brand: 'Rankem',
    category: 'Testing Products',
  },
  {
    name: 'Merck Phenolphthalein indicator Solution',
    image: '/uploads/product60.webp',
    description: 'Merck Phenolphthalein indicator Solution ',
    brand: 'Merck',
    category: 'Testing Products',
  },
  {
    name: 'STD Calibration weight',
    image: '/uploads/product61.webp',
    description: 'STD Calibration weight for precise measurement',
    category: 'Testing Products',
  },
  {
    name: 'Fabric Thickness Tester',
    image: '/uploads/product62.jpg',
    description: 'Fabric Thickness Tester ',
    category: 'Testing Products',
  },
  {
    name: 'Tide Plus Bleach for Laboratory Testing',
    image: ['/uploads/product32.jpg',
            '/uploads/product32.1.jpg',
           ],
    description: 'Tide Plus Bleach for Laboratory Testing (Make - USA)',
    brand: 'Tide',
    category: 'Testing Products',
  },
];

const PaintAndCoating = [
    {
    name: 'SDC Standard Soap',
    image: '/uploads/product12.jpg',
    description: 'Description for consumable product 2',
    brand: 'SDC',
    category: 'Paint & Coating',
  },
  {
    name: 'SDC ECE Phosphate Reference Detergent (B)',
    image: ['/uploads/product7.jpg',
            '/uploads/product7.1.jpg'
           ],
    description: 'Make- United Kingdom',
    brand: 'SDC',
    category: 'Paint & Coating',
  },
  {
    name: 'AATCC 1993 Standard Reference Detergent',
    image: '/uploads/product46.jpg',
    description: 'AATCC 1993 Standard Reference Detergent without Brightner (WOB) (Make - USA)',
    category: 'Paint & Coating',
  },
];

const allProducts = [...consumableProducts, ...testingProducts, ...PaintAndCoating];

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
