import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaHistory } from 'react-icons/fa';
import './Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '', history: [] });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState({ name: '', phone: '', address: '' });
  const [showHistoryIndex, setShowHistoryIndex] = useState(null);

  const handleAdd = () => {
    if (!newCustomer.name || !newCustomer.phone) return;
    setCustomers([...customers, { ...newCustomer, history: [] }]);
    setNewCustomer({ name: '', phone: '', address: '', history: [] });
  };

  const handleDelete = (index) => {
    const updated = [...customers];
    updated.splice(index, 1);
    setCustomers(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const { name, phone, address } = customers[index];
    setEditedCustomer({ name, phone, address });
  };

  const handleSave = () => {
    const updated = [...customers];
    updated[editingIndex] = { ...updated[editingIndex], ...editedCustomer };
    setCustomers(updated);
    setEditingIndex(null);
    setEditedCustomer({ name: '', phone: '', address: '' });
  };

  const handleAddPurchase = (index) => {
    const item = prompt('Enter purchase details (e.g., "Notebook - ₹250")');
    if (item) {
      const updated = [...customers];
      updated[index].history.push({ item, date: new Date().toLocaleDateString() });
      setCustomers(updated);
    }
  };

  return (
    <div className="customers-page">
      <h2>Customer Management</h2>
      <input
        placeholder="Name"
        value={newCustomer.name}
        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
      />
      <input
        placeholder="Phone"
        value={newCustomer.phone}
        onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
      />
      <input
        placeholder="Address (optional)"
        value={newCustomer.address}
        onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
      />
      <button onClick={handleAdd}>Add Customer</button>

      <ul>
        {customers.map((c, idx) => (
          <li key={idx}>
            {editingIndex === idx ? (
              <div className="edit-row">
                <input
                  value={editedCustomer.name}
                  onChange={(e) => setEditedCustomer({ ...editedCustomer, name: e.target.value })}
                />
                <input
                  value={editedCustomer.phone}
                  onChange={(e) => setEditedCustomer({ ...editedCustomer, phone: e.target.value })}
                />
                <input
                  value={editedCustomer.address}
                  onChange={(e) => setEditedCustomer({ ...editedCustomer, address: e.target.value })}
                />
                <button onClick={handleSave} title="Save"><FaSave /></button>
              </div>
            ) : (
              <div className="display-row">
                <div>
                  <strong>{c.name}</strong> - {c.phone}<br />
                  {c.address && <span>📍 {c.address}<br /></span>}
                  🛒 Purchases: {c.history.length}
                </div>
                <div className="actions">
                  <button onClick={() => handleAddPurchase(idx)} title="Add Purchase">🛍️</button>
                  <button onClick={() => setShowHistoryIndex(showHistoryIndex === idx ? null : idx)} title="View History"><FaHistory /></button>
                  <button onClick={() => handleEdit(idx)} title="Edit"><FaEdit /></button>
                  <button onClick={() => handleDelete(idx)} title="Delete"><FaTrash /></button>
                </div>
              </div>
            )}

            {showHistoryIndex === idx && c.history.length > 0 && (
              <div className="history-list">
                <h4>📄 Purchase History:</h4>
                <ul>
                  {c.history.map((h, i) => (
                    <li key={i}>{h.date}: {h.item}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;
