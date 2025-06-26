import React from 'react';
import './Dashboard.css';
import CountUp from 'react-countup';
import { FaUsers, FaBoxOpen, FaCashRegister, FaMoneyBillWave } from 'react-icons/fa';

const Dashboard = () => {
  const metrics = [
    { title: 'Total Sales', value: 12500, prefix: '₹', icon: <FaCashRegister /> },
    { title: 'Inventory Items', value: 42, suffix: ' Products', icon: <FaBoxOpen /> },
    { title: 'Customers', value: 18, icon: <FaUsers /> },
    { title: "Today's Revenue", value: 3200, prefix: '₹', icon: <FaMoneyBillWave /> },
  ];

  return (
    <div className="dashboard-page">
      <h2>Business Dashboard</h2>
      <p className="subtitle">Overview of your business activity</p>

      <div className="metrics-container">
        {metrics.map((item, idx) => (
          <div className="metric-card" key={idx}>
            <div className="metric-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>
              <CountUp
                start={0}
                end={item.value}
                duration={2}
                separator=","
                prefix={item.prefix || ''}
                suffix={item.suffix || ''}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
