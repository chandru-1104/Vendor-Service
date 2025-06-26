import React, { useContext } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { SalesContext } from '../../context/SalesContext';
import './Sales.css';

const Sales = () => {
  const { sales } = useContext(SalesContext);

  const groupBy = (period) => {
    const grouped = {};
    sales.forEach(({ date, amount }) => {
      const d = new Date(date);
      let key = '';
      if (period === 'daily') key = d.toLocaleDateString();
      if (period === 'weekly') key = `Week ${getWeekNumber(d)} (${d.getFullYear()})`;
      if (period === 'monthly') key = `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
      grouped[key] = (grouped[key] || 0) + amount;
    });
    return Object.entries(grouped).map(([label, amount]) => ({ label, amount }));
  };

  const getWeekNumber = (d) => {
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  };

  const dailyData = groupBy('daily');
  const weeklyData = groupBy('weekly');
  const monthlyData = groupBy('monthly');

  return (
    <div className="sales-page">
      <h2>Sales Overview</h2>

      <h3>📈 Daily Sales</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dailyData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#00a8ff" />
        </LineChart>
      </ResponsiveContainer>

      <h3>📊 Weekly Sales</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#4cd137" />
        </BarChart>
      </ResponsiveContainer>

      <h3>📊 Monthly Sales</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#e67e22" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sales;
