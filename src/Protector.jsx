import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { AuthContext } from './AuthProvider'

const Protector = ({Component}) => { //传进来的对象以及其他的属性

  const { isLoggedIn } = useContext(AuthContext); //获取登录对象的方式就是这个
                                                  //一旦没有登录就会自动跳转到
  return (
        isLoggedIn ?  <Component/> :  <Navigate to={{ pathname: '/login' }} />
  );
};