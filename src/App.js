import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Inventory from './pages/Inventory/Inventory.jsx';
import Billing from './pages/Billing/Billing.jsx';
import Sales from './pages/Sales/Sales.jsx';
// import Customers from './pages/Customers/Customers.jsx';
import ShopSetup from './pages/ShopSetup/ShopSetup.jsx';
import StockManagement from './pages/Stock Management/StockManagement.jsx';
import Navbar from './components/Navbar';
import ShopRegister from './pages/ShopRegister/ShopRegister.jsx';
import Login from './pages/login/login.jsx';
import ProtectedRoute from './pages/protectedRoute.jsx';

// 👉 SalesContext
import { SalesProvider } from './context/SalesContext.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <SalesProvider>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/shop-register" element={<ShopRegister />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop-setup"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Billing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Sales />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/customers"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Customers />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/stock-management"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <StockManagement />
            </ProtectedRoute>
          }
        />
        {/* Catch all: redirect */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} />} />
      </Routes>
    </SalesProvider>
  );
}

export default App;
