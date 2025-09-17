import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface DashboardFilters {
  location: string;
  startDate: string;
  endDate: string;
  timePeriod: string;
}

interface DashboardContextType {
  filters: DashboardFilters;
  updateFilters: (newFilters: Partial<DashboardFilters>) => void;
  refreshData: () => void;
  isLoading: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<DashboardFilters>({
    location: 'all-locations',
    startDate: '2025-01-01', // Match actual data range
    endDate: '2025-01-18', // Match actual data range  
    timePeriod: '18d'
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const updateFilters = (newFilters: Partial<DashboardFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <DashboardContext.Provider value={{ filters, updateFilters, refreshData, isLoading }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}