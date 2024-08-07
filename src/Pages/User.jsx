import { Button, Input } from 'antd';
import '../App.css';
import { Navigate, useActionData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function User() {
    const navi=useNavigate()
    const [name, setName]=useState('')
    const [pwd, setPwd]=useState('')
    const submit=()=>{
      axios.get('http://localhost:8080/user/login', {
        params: {
          password: pwd,
          username: name
        }
      })
      .then(response => {
        // 处理请求成功的响应
        console.log(response.data);
        // 将登录信息存储在storage
        localStorage.setItem('username', name)
        localStorage.setItem('password', pwd)
        localStorage.setItem('userId', response.data.data.userId)
        localStorage.setItem('orgId',  response.data.data.orgId)
        //然后跳转到登录页面
        navi('/')
      })
      .catch(error => {
        // 处理请求错误
        console.error(error);
      });


    }

  return (
    <div style={{
        backgroundColor:'rgb(229, 229, 229)',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }}>
      <div
        style={{
            backgroundColor:'white',
            height:'40vh',
            width:"700px",
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:'40px',
            flexWrap:'wrap',
            fontSize:'40px'
            
        }}>
        <div style={{width:'400px',display:'flex', justifyContent:'center'}}>登录界面</div>
        <Input placeholder="请输入您的用户名" style={{width:'400px'}}   onChange={(e) => setName(e.target.value)}/>
        <Input placeholder="请输入您的密码" style={{width:'400px'}}    onChange={(e) => setPwd(e.target.value)}/>
        <Button style={{width:'400px'}} onClick={()=>submit()}> login </Button>
      </div>
    </div>
  );
}

export default User;

//vh视口单元