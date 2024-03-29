// Products.js
import React, { useState } from 'react';
import productImg from './../images/product.jpeg'; 
import Product from './Product';
import { useSelector } from "react-redux";

function Products() {
  const currency = useSelector((state)=>state.currency)
  
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 10,
      images: [productImg]
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 5,
      images: [productImg]
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 15,
      images: [productImg]
    },
  ]);  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    images: [productImg,],
  }); 
  // Function to handle input changes for the new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Function to handle file input changes for the new product images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewProduct({ ...newProduct, images: files });
  };

  // Function to handle adding a product
  const handleAddProduct = () => {
    // Logic to add a new product to the products array
    setProducts([...products, newProduct]);
    // Reset the form fields
    setNewProduct({
      name: '',
      description: '',
      price: '',
      images: [productImg,],
    });
  };

  return (
    <div>
      <h1 className='container-title'>Products</h1>
      <div className='form-container'>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Name:
            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={newProduct.description} onChange={handleInputChange} />
          </label>
          <label>
            Price:
            <input type="text" name="price" value={newProduct.price} onChange={handleInputChange} />
          </label>
          <label>
            Images:
            <input type="file" multiple onChange={handleImageChange} />
          </label>
          <button onClick={handleAddProduct}>Add Product</button>
        </form>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <Product 
          key={product.id} 
          id={product.id} 
          name={product.name} 
          currency={currency}
          description={product.description} 
          price={currency === "INR" ? (product.price * 82.99).toFixed(2) : product.price * 1 } 
          img={product.images[0]}
        />
        ))}
      </div>
    </div>
  );
}

export default Products;
