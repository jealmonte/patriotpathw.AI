import React, { createContext, useContext, useState, useEffect } from 'react';

const SalaryContext = createContext();

export const SalaryProvider = ({ children }) => {
  const generateRandomSalary = () => {
    const min = 72000;
    const max = 86000;
    const randomSalary = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.floor(randomSalary / 100) * 100;
  };

  const [salary, setSalary] = useState(() => {
    const savedSalary = sessionStorage.getItem('userSalary');
    if (savedSalary) {
      return parseInt(savedSalary, 10);
    }
    // Generate and save a random salary if none exists
    const newSalary = generateRandomSalary();
    sessionStorage.setItem('userSalary', newSalary.toString());
    return newSalary;
  });

  // Ensure salary is always saved to sessionStorage when it changes
  useEffect(() => {
    if (salary) {
      sessionStorage.setItem('userSalary', salary.toString());
    }
  }, [salary]);

  return (
    <SalaryContext.Provider value={{ salary, setSalary }}>
      {children}
    </SalaryContext.Provider>
  );
};

export const useSalary = () => {
  const context = useContext(SalaryContext);
  if (!context) {
    throw new Error('useSalary must be used within a SalaryProvider');
  }
  return context;
};