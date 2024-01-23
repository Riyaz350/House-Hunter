import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const signIn = (userData) =>{
        localStorage.setItem('user', JSON.stringify(userData));
        console.log(userData)
    }

    const getUser = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          return JSON.parse(storedUser);
        }
        return null;
      };

      const user = getUser()

    const signOut = () => {
        localStorage.setItem('user', JSON.stringify(null));

      };

  
      
    const authInfo = { user,  signIn, signOut }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;