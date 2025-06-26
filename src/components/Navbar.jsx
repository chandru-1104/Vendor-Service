import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaStore,
  FaTachometerAlt,
  FaBoxes,
  FaFileInvoiceDollar,
  FaChartLine,
  // FaUsers
} from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    { to: '/', label: 'Shop Setup', icon: <FaStore /> },
    { to: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: '/inventory', label: 'Inventory', icon: <FaBoxes /> },
    { to: '/billing', label: 'Billing', icon: <FaFileInvoiceDollar /> },
    { to: '/sales', label: 'Sales', icon: <FaChartLine /> },
    // { to: '/customers', label: 'Customers', icon: <FaUsers /> }
  ];

  return (
    <nav className="navbar">
      <div className="nav-header">
        <h2 className="logo">Vendor-Service</h2>

        <div className="nav-center">
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navItems.map(({ to, label, icon }, idx) => (
              <li key={idx}>
                <Link to={to} onClick={() => setMenuOpen(false)}>
                  <span className="icon">{icon}</span>
                  <span className="label">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-icons">
          <Link to="/login" className="login-icon">
            <FaUserCircle />
          </Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
