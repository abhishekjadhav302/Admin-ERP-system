// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import StaffDetails from "./components/StaffDetails";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import EditProductForm from "./components/EditProductForm";
import Notification from "./components/Notification";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
          <Route path="/staff-details" element={<StaffDetails />} />
          <Route path="/edit-product/:id" element={<EditProductForm />} />
          <Route path="/notification" element={<Notification />} />
          <Route
            path="/product-form"
            element={
              <ProductForm
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            }
          />
          <Route
            path="/product-list"
            element={<ProductList setSelectedProduct={setSelectedProduct} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
