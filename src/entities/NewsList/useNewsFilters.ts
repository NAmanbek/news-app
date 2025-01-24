// src/entities/NewsList/useNewsFilters.ts
import { useState } from 'react';

export const useNewsFilters = () => {
  const [parameter, setParameter] = useState('q');
  const [sortBy, setSortBy] = useState('relevancy');
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-01-25');
  const [language, setLanguage] = useState('en');

  return {
    parameter,
    setParameter,
    sortBy,
    setSortBy,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    language,
    setLanguage,
  };
};
