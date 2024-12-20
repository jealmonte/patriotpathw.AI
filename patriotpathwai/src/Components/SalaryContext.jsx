import React, { createContext, useContext, useState, useEffect } from 'react';

const SalaryContext = createContext();

export const SalaryProvider = ({ children }) => {
  const getSalaryRange = (yearsOfExperience) => {
    if (yearsOfExperience < 2) {
      return { min: 64000, max: 85000 }; // Intern
    } else if (yearsOfExperience < 3) {
      return { min: 90000, max: 130000 }; // Junior
    } else if (yearsOfExperience < 6) {
      return { min: 135000, max: 160000 }; // Mid-level
    } else {
      return { min: 160000, max: 185000 }; // Senior
    }
  };

  const generateRandomSalary = () => {
    const yearsOfExperience = parseFloat(localStorage.getItem('yearsOfExperience') || '0');
    const { min, max } = getSalaryRange(yearsOfExperience);
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

  // Update salary when years of experience changes
  useEffect(() => {
    const handleExperienceChange = () => {
      const newSalary = generateRandomSalary();
      setSalary(newSalary);
      sessionStorage.setItem('userSalary', newSalary.toString());
    };

    window.addEventListener('storage', (e) => {
      if (e.key === 'yearsOfExperience') {
        handleExperienceChange();
      }
    });

    return () => {
      window.removeEventListener('storage', handleExperienceChange);
    };
  }, []);

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
