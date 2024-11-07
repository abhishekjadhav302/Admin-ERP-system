import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, collection, getDocs, doc, deleteDoc } from "../firebase";
import "../css/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const navigate = useNavigate();

  // Fetch products from Firebase
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched products: ", productList); // Check the data in the console
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    const productRef = doc(db, "products", id); // Reference the specific document
    await deleteDoc(productRef); // Delete the document
    setProducts(products.filter((product) => product.id !== id));
  };

  // Navigate to Edit Page
  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  // Filter products based on the search term
  const filteredProducts = products.filter(
    (product) =>
      (product.productName?.toLowerCase() || "").includes(searchTerm) ||
      (product.description?.toLowerCase() || "").includes(searchTerm) ||
      (product.supplier?.toLowerCase() || "").includes(searchTerm) ||
      (product.category?.toLowerCase() || "").includes(searchTerm)
  );

  return (
    <div className="home-container">
      <h2>Product List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Supplier</th>
            <th>Stock Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="7">Wait loading product!....</td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.supplier}</td>
                <td>{product.stockQuantity}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    onClick={() => handleEdit(product.id)} // Navigate to the edit page
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
