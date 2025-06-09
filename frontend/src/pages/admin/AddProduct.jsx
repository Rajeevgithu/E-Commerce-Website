import React, { useState } from 'react';
import ImageUpload from '../../components/ImageUpload';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  // other fields...

  const handleSubmit = (e) => {
    e.preventDefault();
    // Now you have image URL in 'image' state
    // Use it to submit product data to your backend API
    const newProduct = {
      name,
      price,
      image,
      description,
      // other fields
    };
    // call your API here to add product
    console.log('Submitting product:', newProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      {/* Add more inputs as needed */}

      {/* Image Upload component */}
      <ImageUpload onUpload={(url) => setImage(url)} />
      {image && <img src={image} alt="Uploaded product" className="w-48 mt-2" />}

      <button type="submit" className="btn-primary">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
