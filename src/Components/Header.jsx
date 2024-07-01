import './ComCss.css'
import '../styles/font.css'
import Search from 'antd/es/input/Search';
import { BellOutlined, FileDoneOutlined,UserOutlined } from '@ant-design/icons';
import { Avatar, Table } from 'antd';
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import EventTable from '../Tools/EventTable';




function Header() {
  //关于具体的消息表格内容
  const [isModalOpen,setIsModalOpen]=useState(true)
  const show1=()=>{
      setIsModalOpen(true)
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
            <BellOutlined style={{marginRight:30}}/>
        </div>
        {/*用户信息框*/}
        <div className=' div-center'> 
            <Avatar size={34} icon={<UserOutlined />} />
            <div style={{margin:20}}>用户姓名</div>
        </div>
      </div>
      
      {/*关于内容的小卡片*/}
      <EventTable isModalOpen={{open:isModalOpen, setOpen:()=>setIsModalOpen()}}></EventTable>
    </div>
  );
}

export default Header;