import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, doc, getDoc, updateDoc } from "../firebase";

const EditProductForm = () => {
  const [product, setProduct] = useState(null); // To store the product data
  const { id } = useParams(); // Get the product ID from the URL params
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // To handle redirection after edit/save

  useEffect(() => {
    // Fetch product data based on the product ID from the URL
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id); // Create a document reference using doc()
        const productDoc = await getDoc(productRef); // Use getDoc() to fetch the document

        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() }); // Set the product data in state
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
        setError("Error fetching product data");
      } finally {
        setLoading(false); // Set loading to false once the fetch is done
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading text while the data is fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
  }

  if (!product) {
    return <div>No product found</div>; // Fallback if product data is null
  }

  // Handle form submission (saving edited product data)
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const productRef = doc(db, "products", id); // Reference to the specific product
      await updateDoc(productRef, product); // Update the product data in Firestore
      console.log("Product updated:", product);
      navigate("/home"); // Redirect to the homepage or product list
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Product</h2>
      <form onSubmit={handleSave} className="product-form">
        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={product.productName || ""}
          onChange={(e) =>
            setProduct({ ...product, productName: e.target.value })
          }
        />
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={product.category || ""}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
        <label>Description:</label>
        <textarea
          value={product.description || ""}
          name="description"
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <label>Supplier:</label>
        <input
          type="text"
          name="supplier"
          value={product.supplier || ""}
          onChange={(e) => setProduct({ ...product, supplier: e.target.value })}
        />
        <label>Stock Quantity:</label>
        <input
          type="number"
          name="stockQuantity"
          value={product.stockQuantity || ""}
          onChange={(e) =>
            setProduct({ ...product, stockQuantity: parseInt(e.target.value) })
          }
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price || ""}
          onChange={(e) =>
            setProduct({ ...product, price: parseFloat(e.target.value) })
          }
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProductForm;
