import React, { createContext, useContext, useState } from 'react';

const SalaryContext = createContext();

export const SalaryProvider = ({ children }) => {
  const [salary, setSalary] = useState(() => {
    const savedSalary = sessionStorage.getItem('userSalary');
    return savedSalary ? parseInt(savedSalary, 10) : null;
  });

  return (
    <SalaryContext.Provider value={{ salary, setSalary }}>
      {children}
    </SalaryContext.Provider>
  );
};

export const useSalary = () => {
  return useContext(SalaryContext);
};
