import React from 'react';
import { Navigate } from 'react-router-dom';

import ShopSetup from './pages/ShopSetup/ShopSetup.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Inventory from './pages/Inventory/Inventory.jsx';
import Billing from './pages/Billing/Billing.jsx';
import Sales from './pages/Sales/Sales.jsx';
import Customers from './pages/Customers/Customers.jsx';
import StockManagement from './pages/Stock Management/StockManagement.jsx';

const routes = [
  { path: '/', element: <ShopSetup /> },
  { path: '/shop-setup', element: <ShopSetup /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/inventory', element: <Inventory /> },
  { path: '/billing', element: <Billing /> },
  { path: '/sales', element: <Sales /> },
  { path: '/customers', element: <Customers /> },
  { path: '/stock-management', element: <StockManagement /> },
  { path: '*', element: <Navigate to="/" /> },
];

export default routes;
