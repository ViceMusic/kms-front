
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //鉴权状态
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const login = () => {
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      setIsLoggedIn(false);
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn,login, logout }}>
        {children} 
      </AuthContext.Provider>
    );
  };

  // 用来传递消息的provider
  // 使用指令import { AuthContext } from './AuthProvider' 和 useContext就能访问到对应的东西