import './ComCss.css'
import '../styles/font.css'
import '../App.css'
import Search from 'antd/es/input/Search';
import { BellOutlined, FileDoneOutlined,UserOutlined } from '@ant-design/icons';
import { Avatar, Drawer, Popover, Table } from 'antd';
import React, { useState,useContext, useEffect } from 'react';
import { Button, Modal } from 'antd';
import EventTable from '../Tools/EventTable';
import Message from '../Tools/Message';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import axios from 'axios';
import TagCon from '../Pages/TagCon';




function Header(props) {
  
  //搜索历史页面
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //历史消息
  const [searchRecords,setSearchRecords]=useState([])


  const {inSearch, setInSearch, searchs,SetSearchs }=useContext(AuthContext)
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
      console.log(isModalOpen2)
  }

  //顶部搜索框
  const onSearch = (value) => {
    setInSearch(true)
    //获取知识
    axios.get('http://localhost:8080/knowledge/search', {
      params: {
        value:value,
      }
    })
    .then(response => {
      SetSearchs(response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
    //新增搜索历史
    axios.get('http://localhost:8080/search/insert', {
      params: {
        userId:localStorage.getItem('userId'),
        content:value,
        tt:new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
      
    });
    //获取全部的搜索历史
    axios.get('http://localhost:8080/search/getByUserId', {
      params: {
        userId:localStorage.getItem('userId'),
      }
    })
    .then(response => {
      //console.log('展示全部',response.data)
      setSearchRecords(response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  }
  useEffect(()=>{
    axios.get('http://localhost:8080/search/getByUserId', {
      params: {
        userId:localStorage.getItem('userId'),
      }
    })
    .then(response => {
      //console.log('展示全部',response.data)
      setSearchRecords(response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  })

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
            <Button type="primary" onClick={showDrawer} style={{marginLeft:20}}>历史记录</Button>
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
            <Popover placement="bottom"  content={
              <div style={{
                
                width:'200px',
                alignContent:'space-between'
              }}>
                <Button style={{width:'100%', marginBottom:10}} onClick={()=>{navi('/')}}> 返回主页</Button><br/>
                <Button style={{width:'100%', marginBottom:10}} onClick={()=>{navi('/')}}> 查看历史浏览记录</Button><br/>
                <Button style={{width:'100%'}} onClick={()=>logout()}> logout</Button>
              </div>
              }
              >
             <div style={{margin:20}}>{localStorage.getItem('username')}</div>
            </Popover>
            
        </div>
      </div>
      
      {/*关于内容的小卡片*/}
      <EventTable isModalOpen={{open:isModalOpen, setOpen:()=>setIsModalOpen()}}></EventTable>
      <Message isModalOpen={{open:isModalOpen2, setOpen:()=>setIsModalOpen2()}}></Message>
      <TagCon backgroundColor='yellow'></TagCon>
      <Drawer title="搜索历史" onClose={onClose} open={open}>
        {searchRecords.map(item=>{
          return <div style={{margin:10}}
            onClick={()=>{
                onClose()
                 setInSearch(true)
                //获取知识
                axios.get('http://localhost:8080/knowledge/search', {
                  params: {
                    value:item.content,
                  }
                })
                .then(response => {
                  SetSearchs(response.data.data)
                })
                .catch(error => {
                  // 处理请求错误
                  console.error(error);
                });
            }}
          >{item.content}
          <Button onClick={()=>{ //删除搜索记录
            axios.get('http://localhost:8080/search/deleteBySearchId', {
              params: {
                searchId:item.searchId,
              }
            })
            .then(response => {
            })
            .catch(error => {
              // 处理请求错误
              console.error(error);
            });
          }}>
            删除记录
          </Button>
          
          </div>
        })}
      </Drawer>
    </div>
  );
}

export default Header;