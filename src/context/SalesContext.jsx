import React, { createContext, useState } from 'react';

export const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  const addSale = (amount) => {
    const newSale = {
      date: new Date().toISOString(),
      amount: parseFloat(amount),
    };
    setSales((prev) => [...prev, newSale]);
  };

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
};
