import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { AuthContext } from './AuthProvider'

const Protector = ({Component}) => { //传进来的对象以及其他的属性

  const { isLoggedIn } = useContext(AuthContext); //获取登录对象的方式就是这个
                                                  //一旦没有登录就会自动跳转到
  const [username, setUsername]=useState(localStorage.getItem('username'))

  console.log(username)
  return (
        username ?  <Component/> :  <Navigate to={{ pathname: '/login' }} />
  );
};

export default Protector;