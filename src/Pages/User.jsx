import { Input } from 'antd';
import '../App.css';
import { useActionData } from 'react-router-dom';
import { useState } from 'react';

function User() {
    const [name, setName]=useState('')
    const [pwd, setPwd]=useState('')

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
    }}>
        <Input placeholder="请输入您的用户名"  onChange={(e) => setName(e.target.value)}/>
        <Input placeholder="请输入您的密码"  onChange={(e) => setPwd(e.target.value)}/>
      </div>
    </div>
  );
}

export default User;

//vh视口单元