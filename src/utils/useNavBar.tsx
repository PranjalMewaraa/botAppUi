import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for the context value
interface NavBarContextType {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with a default value (you can also set it to null and handle that separately)
const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

// Create a provider component with type for children
interface NavBarProviderProps {
  children: ReactNode;
}

export const NavBarProvider: React.FC<NavBarProviderProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <NavBarContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </NavBarContext.Provider>
  );
};

// Custom hook for consuming the context with proper type checking
export const useNavBar = (): NavBarContextType => {
  const context = useContext(NavBarContext);
  if (!context) {
    throw new Error('useNavBar must be used within a NavBarProvider');
  }
  return context;
};
