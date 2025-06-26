import React, { useState } from 'react';
import './ShopSetup.css';

const ShopSetup = () => {
  const [shop, setShop] = useState({
    shopName: '',
    ownerName: '',
    location: '',
    gstin: '',
    licenseNumber: '',
    panCard: '',
    aadharNumber: '',
    bankAccount: '',
    ifscCode: '',
    uploadLicense: '',
    rentalStatus: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShop((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    alert('Shop information saved successfully!');
    console.log('Vendor Shop Details:', shop);
  };

  return (
    <div className="shopsetup-page">
      <div className="form-wrapper">
        <h2>Vendor Shop Setup</h2>
        <form className="shop-grid">
          {/* Shop Name & Owner */}
          <div className="field-box">
            <label>Shop Name</label>
            <input
              name="shopName"
              placeholder="Enter Shop Name"
              value={shop.shopName}
              onChange={handleChange}
            />
          </div>

          <div className="field-box">
            <label>Owner Name</label>
            <input
              name="ownerName"
              placeholder="Enter Owner Name"
              value={shop.ownerName}
              onChange={handleChange}
            />
          </div>

          {/* Location & GSTIN */}
          <div className="field-box">
            <label>Location</label>
            <input
              name="location"
              placeholder="Enter Shop Location"
              value={shop.location}
              onChange={handleChange}
            />
          </div>

          <div className="field-box">
            <label>GSTIN</label>
            <input
              name="gstin"
              placeholder="Enter GSTIN Number"
              value={shop.gstin}
              onChange={handleChange}
            />
          </div>

          {/* License & PAN */}
          <div className="field-box">
            <label>License Number</label>
            <input
              name="licenseNumber"
              placeholder="Enter License Number"
              value={shop.licenseNumber}
              onChange={handleChange}
            />
          </div>

          <div className="field-box">
            <label>PAN Card</label>
            <input
              name="panCard"
              placeholder="Enter PAN Number"
              value={shop.panCard}
              onChange={handleChange}
            />
          </div>

          {/* Aadhar & Bank Account */}
          <div className="field-box">
            <label>Aadhar Number</label>
            <input
              name="aadharNumber"
              placeholder="Enter Aadhar Number"
              value={shop.aadharNumber}
              onChange={handleChange}
            />
          </div>

          <div className="field-box">
            <label>Bank Account</label>
            <input
              name="bankAccount"
              placeholder="Enter Bank Account Number"
              value={shop.bankAccount}
              onChange={handleChange}
            />
          </div>

          {/* IFSC & License File */}
          <div className="field-box">
            <label>IFSC Code</label>
            <input
              name="ifscCode"
              placeholder="Enter IFSC Code"
              value={shop.ifscCode}
              onChange={handleChange}
            />
          </div>

          <div className="field-box">
            <label>License File URL</label>
            <input
              name="uploadLicense"
              placeholder="Paste License File URL"
              value={shop.uploadLicense}
              onChange={handleChange}
            />
          </div>

<div className="rental-options">
  <div
    className={`rental-option ${shop.rentalStatus === 'rented' ? 'selected' : ''}`}
    onClick={() => setShop({ ...shop, rentalStatus: 'rented' })}
  >
    Rented
  </div>
  <div
    className={`rental-option ${shop.rentalStatus === 'owned' ? 'selected' : ''}`}
    onClick={() => setShop({ ...shop, rentalStatus: 'owned' })}
  >
    Owned
  </div>
</div>

</form>
          {/* Submit Button */}
          <button type="button" onClick={handleSave}>
            Save Details
          </button>
        
      </div>
    </div>
  );
};

export default ShopSetup;
