import './ComCss.css'
import '../styles/font.css'
import '../App.css'
import Search from 'antd/es/input/Search';
import { BellOutlined, FileDoneOutlined,UserOutlined } from '@ant-design/icons';
import { Avatar, Popover, Table } from 'antd';
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import EventTable from '../Tools/EventTable';
import Message from '../Tools/Message';
import { useNavigate } from 'react-router-dom';




function Header() {
  //浮动窗口

  const navi=useNavigate()
  //注销用户
  const logout=()=>{
    localStorage.clear('username')
    localStorage.clear('password')
    navi('/login')

  }
  //关于具体的消息表格内容
  const [isModalOpen,setIsModalOpen]=useState(false)
  const show1=()=>{
      setIsModalOpen(true)
      console.log(isModalOpen)
  }

  //关于消息框的内嵘
  const [isModalOpen2,setIsModalOpen2]=useState(false)
  const show2=()=>{
      setIsModalOpen2(true)
      console.log(isModalOpen)
  }

  //顶部搜索框
  const onSearch = (value) => console.log(value);
  return (
    <div className='header'>

      {/*header左侧栏目*/}
      <div className='headerSon' style={{fontSize:30}}>
        {/*公司的名字和logo*/}
        <div className='font-backcolor-white div-center' > 
            <div style={{backgroundColor:'grey', height:30,width:30, margin:10}}></div>
            <div className='font-backcolor-white' style={{fontSize:20, margin:20}}>公司名称</div>
        </div>
        {/*关于系统的名称的几个大字*/}
        <div className='thick-italic font-backcolor-white div-center'> 知识库管理系统</div>
        {/*关于提问框*/}
        <div className='font-backcolor-white  div-center' style={{color:'white',marginLeft:100}}> 
            <Search placeholder="input search text" style={{width:700}} onSearch={onSearch} enterButton  /> 
        </div>
      </div>


      {/*header右侧栏目*/}
      <div className='headerSon'>
        {/*两个小标识*/}
        <div className=' div-center' style={{fontSize:40,margin:10}}> 
            <FileDoneOutlined style={{marginRight:30}} onClick={()=>show1()}/>
            <BellOutlined style={{marginRight:30}} onClick={()=>show2()}/>
        </div>
        {/*用户信息框*/}
        <div className=' div-center' > 
          {/*用户头像*/}
            <Avatar size={34} icon={<UserOutlined />}  />
            
            {/*用户姓名*/}
            <Popover placement="bottom" title={'用户信息'} content={<Button onClick={()=>logout()}> logout</Button>}>
             <div style={{margin:20}}>{localStorage.getItem('username')}</div>
            </Popover>
            
        </div>
      </div>
      
      {/*关于内容的小卡片*/}
      <EventTable isModalOpen={{open:isModalOpen, setOpen:()=>setIsModalOpen()}}></EventTable>
      <Message isModalOpen={{open:isModalOpen2, setOpen:()=>setIsModalOpen2()}}></Message>
    </div>
  );
}

export default Header;