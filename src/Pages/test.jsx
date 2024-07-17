import { Button, Input } from 'antd';
import '../App.css';
import { Navigate, useActionData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Test() {
    const navi=useNavigate()

  return (
    <div style={{
        backgroundColor:'rgb(229, 229, 229)',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }}>
     文件上传的测试页面(主要测试antd的文件上传和下载)
     文件上传的原理: 让后端帮忙存储一下文件的路由地址
     然后另外启动一个node端, 将文件保存在这里方便和前端进行交互
    </div>
  );
}

export default Test

//vh视口单元