import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const signIn = (userData) =>{
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData));
        console.log(userData)
    }

    const signOut = () => {
        // Logic to sign out the user
        localStorage.setItem('user', JSON.stringify(null));

      };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));

        }
      }, []);
    
      useEffect(() => {
      }, [user]);
      
    const authInfo = { user, setUser, signIn, signOut }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;