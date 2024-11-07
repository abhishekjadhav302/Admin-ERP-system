import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, doc, getDocs } from "../firebase"; // Ensure that getDoc is imported

const EditProductForm = () => {
  const [product, setProduct] = useState(null); // To store the product data
  const { id } = useParams(); // Get the product ID from the URL params
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // To handle redirection after edit/save

  useEffect(() => {
    // Fetch product data based on the product ID from the URL
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id); // Create a document reference using doc()
        const productDoc = await getDocs(productRef); // Use getDoc() to fetch the document

        if (productDoc.exists()) {
          setProduct(productDoc.data()); // Set the product data in state
        } else {
          console.log("No such product found!");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is done
      }
    };

    fetchProduct();
  }, [id]); // This effect will run when the product ID changes

  if (loading) {
    return <div>Loading...</div>; // Show loading text while the data is fetching
  }

  if (!product) {
    return <div>No product found</div>; // Show this message if the product doesn't exist
  }

  // Handle form submission (saving edited product data)
  const handleSave = async (e) => {
    e.preventDefault();

    // Save the updated product data (implement your save logic here)
    try {
      // Example: Save logic using Firebase update (you can implement your update logic)
      console.log("Product saved:", product);
      // Navigate back to the product list after saving (example)
      navigate("/home");
    } catch (error) {
      console.error("Error saving product: ", error);
    }
  };

  return (
    <div className="edit-product-form">
      <h2>Edit Product</h2>
      <form onSubmit={handleSave}>
        <label>Product Name:</label>
        <input
          type="text"
          value={product.productName}
          onChange={(e) =>
            setProduct({ ...product, productName: e.target.value })
          }
        />
        <label>Category:</label>
        <input
          type="text"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
        <label>Description:</label>
        <textarea
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <label>Supplier:</label>
        <input
          type="text"
          value={product.supplier}
          onChange={(e) => setProduct({ ...product, supplier: e.target.value })}
        />
        <label>Stock Quantity:</label>
        <input
          type="number"
          value={product.stockQuantity}
          onChange={(e) =>
            setProduct({ ...product, stockQuantity: e.target.value })
          }
        />
        <label>Price:</label>
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProductForm;
