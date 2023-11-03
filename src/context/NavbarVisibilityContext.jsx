
import React, { createContext, useState, useContext } from 'react';

const NavbarVisibilityContext = createContext();

export const useNavbarVisibility = () => {
  return useContext(NavbarVisibilityContext);
};

export const NavbarVisibilityProvider = ({ children }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbarVisibility = () => {
    setIsNavbarVisible(prevState => !prevState);
  };

  return (
    <NavbarVisibilityContext.Provider
      value={{ isNavbarVisible, toggleNavbarVisibility }}
    >
      {children}
    </NavbarVisibilityContext.Provider>
  );
};
