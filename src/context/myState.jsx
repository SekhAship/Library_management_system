/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/firebaseConfig';

function MyState({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false); // ✅ Add loading state
  
    useEffect(() => {
      // Check if user is authenticated (Example: using localStorage or Firebase auth)
      const token = localStorage.getItem('user');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, []);
  
    const login = (token) => {
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
    };
  
    const logout = () => {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
    };
  
    return (
      <MyContext.Provider value={{ isAuthenticated, login, logout, loading, setLoading }}> 
        {children}
      </MyContext.Provider>
    );
}

export default MyState;
