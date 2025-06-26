import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // NEW
import 'react-toastify/dist/ReactToastify.css'; // NEW
import './Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    purchasePrice: '',
    sellPrice: '',
    stock: '',
  });

  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🚨 Track products for toast alert
  useEffect(() => {
    products.forEach((product) => {
      if (parseInt(product.stock) === 10) {
        toast.info(`⚠️ Stock Alert: "${product.name}" has reached 10 units`, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
    });
  }, [products]);

  const handleAddOrUpdate = () => {
    if (!newProduct.name || !newProduct.category) return;

    const updatedProduct = {
      ...newProduct,
      lastUpdated: new Date().toLocaleString(),
    };

    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = updatedProduct;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, updatedProduct]);
    }

    setNewProduct({
      name: '',
      category: '',
      purchasePrice: '',
      sellPrice: '',
      stock: '',
    });
  };

  const handleEdit = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="inventory-page">
      <h2>Inventory Control Hub</h2>

      <div className="form-container">
        <input
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          placeholder="Purchase Price"
          value={newProduct.purchasePrice}
          onChange={(e) => setNewProduct({ ...newProduct, purchasePrice: e.target.value })}
        />
        <input
          placeholder="Sell Price"
          value={newProduct.sellPrice}
          onChange={(e) => setNewProduct({ ...newProduct, sellPrice: e.target.value })}
        />
        <input
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? 'Update Product' : 'Add Product'}
        </button>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Purchase Price</th>
              <th>Selling Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.purchasePrice}</td>
                <td>₹{product.sellPrice}</td>
                <td>
                  {parseInt(product.stock) > 0 ? (
                    <span className="in-stock">In Stock</span>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Inventory;
