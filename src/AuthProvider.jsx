
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

    //检测是否在登录状态
    const [ inSearch, setInSearch1]=useState(false)
    //获取到搜索以后展示的文件内容
    const [ searchs,SetSearchs1]=useState([])

    const setInSearch=(a)=>{
      setInSearch1(a)
    }
    const SetSearchs=(a)=>{
      SetSearchs1(a)
    }
  
    return (
      <AuthContext.Provider value={{ isLoggedIn,login, logout,inSearch, setInSearch, searchs,SetSearchs }}>
        {children} 
      </AuthContext.Provider>
    );
  };

  // 用来传递消息的provider
  // 使用指令import { AuthContext } from './AuthProvider' 和 useContext就能访问到对应的东西