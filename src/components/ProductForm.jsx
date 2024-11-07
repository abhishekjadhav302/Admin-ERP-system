import React, { useState } from "react";
import "../css/ProductForm.css";
import { db, collection, addDoc } from "../firebase";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    supplier: "",
    stockQuantity: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), formData);
      alert("Product added successfully!");
      setFormData({
        productName: "",
        category: "",
        description: "",
        supplier: "",
        stockQuantity: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Supplier:
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stock Quantity:
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Save Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
