import React, { useState } from 'react';
import './StockManagement.css';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';

const StockManagement = () => {
  const [purchases, setPurchases] = useState([]);
  const [newPurchase, setNewPurchase] = useState({
    item: '',
    quantity: '',
    purchasePrice: '',
    dealerName: '',
    dealerContact: '',
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPurchase, setEditedPurchase] = useState({});

  const handleAddPurchase = () => {
    if (!newPurchase.item || !newPurchase.quantity || !newPurchase.purchasePrice || !newPurchase.dealerName) return;
    setPurchases([...purchases, newPurchase]);
    setNewPurchase({
      item: '',
      quantity: '',
      purchasePrice: '',
      dealerName: '',
      dealerContact: '',
    });
  };

  const handleDelete = (index) => {
    const updated = [...purchases];
    updated.splice(index, 1);
    setPurchases(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedPurchase(purchases[index]);
  };

  const handleSave = () => {
    const updated = [...purchases];
    updated[editingIndex] = editedPurchase;
    setPurchases(updated);
    setEditingIndex(null);
    setEditedPurchase({});
  };

  return (
    <div className="stock-page">
      <h2>Stock Purchase Management</h2>

      <input
        placeholder="Item Name"
        value={newPurchase.item}
        onChange={(e) => setNewPurchase({ ...newPurchase, item: e.target.value })}
      />
      <input
        placeholder="Quantity"
        type="number"
        value={newPurchase.quantity}
        onChange={(e) => setNewPurchase({ ...newPurchase, quantity: parseInt(e.target.value) })}
      />
      <input
        placeholder="Purchase Price (₹)"
        type="number"
        value={newPurchase.purchasePrice}
        onChange={(e) => setNewPurchase({ ...newPurchase, purchasePrice: parseFloat(e.target.value) })}
      />
      <input
        placeholder="Dealer Name"
        value={newPurchase.dealerName}
        onChange={(e) => setNewPurchase({ ...newPurchase, dealerName: e.target.value })}
      />
      <input
        placeholder="Dealer Contact (optional)"
        value={newPurchase.dealerContact}
        onChange={(e) => setNewPurchase({ ...newPurchase, dealerContact: e.target.value })}
      />
      <button onClick={handleAddPurchase}>Add Purchase</button>

      <ul>
        {purchases.map((p, idx) => (
          <li key={idx}>
            {editingIndex === idx ? (
              <div className="edit-row">
                <input
                  value={editedPurchase.item}
                  onChange={(e) => setEditedPurchase({ ...editedPurchase, item: e.target.value })}
                />
                <input
                  type="number"
                  value={editedPurchase.quantity}
                  onChange={(e) => setEditedPurchase({ ...editedPurchase, quantity: parseInt(e.target.value) })}
                />
                <input
                  type="number"
                  value={editedPurchase.purchasePrice}
                  onChange={(e) => setEditedPurchase({ ...editedPurchase, purchasePrice: parseFloat(e.target.value) })}
                />
                <input
                  value={editedPurchase.dealerName}
                  onChange={(e) => setEditedPurchase({ ...editedPurchase, dealerName: e.target.value })}
                />
                <input
                  value={editedPurchase.dealerContact}
                  onChange={(e) => setEditedPurchase({ ...editedPurchase, dealerContact: e.target.value })}
                />
                <button onClick={handleSave} title="Save"><FaSave /></button>
              </div>
            ) : (
              <div className="display-row">
                <strong>{p.item}</strong> - Qty: {p.quantity} @ ₹{p.purchasePrice.toFixed(2)}<br />
                Supplier: {p.dealerName} {p.dealerContact && `(${p.dealerContact})`}
                <div className="actions">
                  <button onClick={() => handleEdit(idx)} title="Edit"><FaEdit /></button>
                  <button onClick={() => handleDelete(idx)} title="Delete"><FaTrash /></button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockManagement;
