import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { healthCheck } from '../api/users';
import Cookies from 'js-cookie';

const RedirectIfLoggedIn = ({ children }) => {
  const token = Cookies.get('token');
  const [isTokenValid, setIsTokenValid] = useState(null);
  
  const checkTokenHealth = async () => {
    try {
      const response = await healthCheck();

      if (response.data.isValid) {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
      }
    } catch (error) {
      console.error('Error checking token health:', error);
      setIsTokenValid(false);
    }
  };

  useEffect(() => {
    if (token) {
      checkTokenHealth();
    } else {
      setIsTokenValid(false);
    }
  }, [token]);

  if (isTokenValid === null) {
    return <div>Loading...</div>;
  }

  if (isTokenValid === false) {
    const currentPath = window.location.pathname;
    if (currentPath === '/login' || currentPath === '/register' || currentPath === '/') {
      return children;
    }
    return <Navigate to="/login" />;
  }

  if(isTokenValid === true) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RedirectIfLoggedIn;