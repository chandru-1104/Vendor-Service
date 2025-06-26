import React from 'react';
import './ShopRegister.css';

const ShopRegister = () => {
  return (
    <div className="shop-container">
      <div className="form-card">
        <h2 className="form-title">Register Your Shop</h2>
        <form className="form-grid">
          {/* Row 1 */}
          <input type="text" placeholder="Enter shop name" />
          <input type="email" placeholder="Enter shop email" />

          {/* Row 2 */}
          <input type="tel" placeholder="Enter shop phone" />
          <input type="email" placeholder="Enter user email" />

          {/* Row 3 */}
          <div className="password-group">
            <input type="password" placeholder="Enter password" />
            <span className="toggle-eye">&#128065;</span>
          </div>
          <input type="text" placeholder="Enter shop country" />

          {/* Row 4 */}
          <input type="text" placeholder="Enter shop state" />
          <input type="text" placeholder="Enter shop city" />

          {/* Row 5 */}
          <input type="text" placeholder="Enter shop zip code" />
          <input type="text" placeholder="Enter shop address" className="full-width" />

          {/* Submit */}
          <button type="submit" className="submit-btn">Register</button>

          {/* Login link */}
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ShopRegister;
