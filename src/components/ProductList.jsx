import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, collection, getDocs, deleteDoc, doc } from "../firebase";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const productsCollection = collection(db, "products");
    const productDocs = await getDocs(productsCollection);
    const productList = productDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <h3>{product.productName}</h3>
          <p>{product.description}</p>
          <Link to={`/edit/${product.id}`}>Edit</Link>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
