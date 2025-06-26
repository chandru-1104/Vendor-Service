import React, { useState, useContext } from 'react';
import { SalesContext } from '../../context/SalesContext';
import './Billing.css';

const Billing = () => {
  const inventoryData = [
    { name: 'Parle-G', category: 'Snacks', price: 5 },
    { name: 'Lays', category: 'Snacks', price: 10 },
    { name: 'Pepsi', category: 'Beverages', price: 20 },
    { name: 'Coke', category: 'Beverages', price: 25 },
    { name: 'Dettol', category: 'Personal Care', price: 30 },
  ];

  const { addSale } = useContext(SalesContext);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [item, setItem] = useState({ name: '', price: '', qty: '' });
  const [items, setItems] = useState([]);
  const [taxType, setTaxType] = useState('intra');

  const [billedTo, setBilledTo] = useState({
    name: '',
    address: '',
    email: ''
  });

  const [billedFrom, setBilledFrom] = useState({
    name: '',
    address: '',
    email: ''
  });

  const categories = [...new Set(inventoryData.map(p => p.category))];
  const productsInCategory = inventoryData.filter(p => p.category === selectedCategory);

  const handleProductSelect = (productName) => {
    setSelectedProduct(productName);
    const product = inventoryData.find(p => p.name === productName);
    if (product) setItem({ name: product.name, price: product.price, qty: '' });
  };

  const handleAdd = () => {
    if (!item.name || !item.price || !item.qty) return;
    setItems([...items, item]);
    setItem({ name: '', price: '', qty: '' });
    setSelectedCategory('');
    setSelectedProduct('');
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const gstAmount = subtotal * 0.18;
  const cgst = taxType === 'intra' ? gstAmount / 2 : 0;
  const sgst = taxType === 'intra' ? gstAmount / 2 : 0;
  const igst = taxType === 'inter' ? gstAmount : 0;
  const total = subtotal + cgst + sgst + igst;

  const handlePrint = () => {
    addSale(total);
    window.print();
  };

  const exportGSTReport = () => {
    const csv = [
      ['Date', 'Item', 'Qty', 'Price', 'Subtotal', 'CGST', 'SGST', 'IGST'],
      ...items.map(i => [
        new Date().toLocaleDateString(), i.name, i.qty, i.price,
        (i.price * i.qty).toFixed(2),
        (taxType === 'intra' ? ((i.price * i.qty) * 0.09).toFixed(2) : '0.00'),
        (taxType === 'intra' ? ((i.price * i.qty) * 0.09).toFixed(2) : '0.00'),
        (taxType === 'inter' ? ((i.price * i.qty) * 0.18).toFixed(2) : '0.00')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'GST_Monthly_Report.csv';
    link.click();
  };

  return (
    <div className='name'><h2>Billing System</h2>
    <div className="billing-container">
      
      <div className="form-section">
       

        <div className="billing-info">
          <div>
            <h4>Billed To</h4>
            <input type="text" placeholder="Name" value={billedTo.name} onChange={(e) => setBilledTo({ ...billedTo, name: e.target.value })} />
            <input type="text" placeholder="Address" value={billedTo.address} onChange={(e) => setBilledTo({ ...billedTo, address: e.target.value })} />
            <input type="email" placeholder="Email" value={billedTo.email} onChange={(e) => setBilledTo({ ...billedTo, email: e.target.value })} />
          </div>

          <div>
            <h4>Billed From</h4>
            <input type="text" placeholder="Name" value={billedFrom.name} onChange={(e) => setBilledFrom({ ...billedFrom, name: e.target.value })} />
            <input type="text" placeholder="Address" value={billedFrom.address} onChange={(e) => setBilledFrom({ ...billedFrom, address: e.target.value })} />
            <input type="email" placeholder="Email" value={billedFrom.email} onChange={(e) => setBilledFrom({ ...billedFrom, email: e.target.value })} />
          </div>
        </div>

        <div className="item-row">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>

          {selectedCategory && (
            <select value={selectedProduct} onChange={(e) => handleProductSelect(e.target.value)}>
              <option value="">Select Product</option>
              {productsInCategory.map((prod, i) => (
                <option key={i} value={prod.name}>{prod.name}</option>
              ))}
            </select>
          )}

          <input type="number" placeholder="Qty" value={item.qty} onChange={(e) => setItem({ ...item, qty: parseInt(e.target.value) })} />
          <input type="number" placeholder="Price" value={item.price} readOnly />
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>

      {/* Invoice Preview Section */}
      <div className="invoice-preview" id="invoiceToPrint">
        <div className="invoice-header">
          <div>
            <h3>{billedFrom.name || "Your Name"}</h3>
            <p><strong>Invoice #:</strong> 1</p>
          </div>
          <div className="amount-due">
            <p><strong>Amount Due:</strong></p>
            <h3>₹{total.toFixed(2)}</h3>
          </div>
        </div>

        <div className="invoice-meta">
          <div>
            <h4>Billed to:</h4>
            <p>{billedTo.name}<br />{billedTo.address}<br />{billedTo.email}</p>
          </div>
          <div>
            <h4>Billed from:</h4>
            <p>{billedFrom.name}<br />{billedFrom.address}<br />{billedFrom.email}</p>
          </div>
          <div>
            <h4>Date Of Issue:</h4>
            <p>{new Date().toISOString().slice(0, 10)}</p>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>QTY</th>
              <th>DESCRIPTION</th>
              <th>PRICE</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.qty}</td>
                <td>{item.name}</td>
                <td>₹{item.price.toFixed(2)}</td>
                <td>₹{(item.price * item.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">SUBTOTAL</td>
              <td>₹{subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="3">TOTAL</td>
              <td>₹{total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div className="invoice-actions">
          <button onClick={handlePrint}>📤 Send Invoice</button>
          <button onClick={handlePrint}>📥 Download Copy</button>
        </div>
      </div>

      <div className="extra-actions">
        <button onClick={exportGSTReport}>📁 Export GST Report</button>
      </div>
      </div> 
    </div>
  );
};

export default Billing;
