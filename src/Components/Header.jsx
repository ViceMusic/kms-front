import './ComCss.css'
import '../styles/font.css'
import '../App.css'
import Search from 'antd/es/input/Search';
import { BellOutlined, FileDoneOutlined,UserOutlined } from '@ant-design/icons';
import { Avatar, Drawer, Popover, Table, Tag } from 'antd';
import React, { useState,useContext, useEffect } from 'react';
import { Button, Modal } from 'antd';
import EventTable from '../Tools/EventTable';
import Message from '../Tools/Message';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import axios from 'axios';
import TagCon from '../Pages/TagCon';
import KnowName from '../Tools/knowName';




function Header(props) {
  //gpt随机返回几个数据
  const [gpt,setGpt]=useState(['没东西'])
  const [hot,setHot]=useState(['没东西'])
  const [aver,setAver]=useState(['没东西'])



  //关于收藏的展示
  const [open1, setOpen1] = useState(false);
  const [collections,setCollections]=useState([])
  const showDrawer1 = () => {
    setOpen1(true);
  };
  const onClose1 = () => {
    setOpen1(false);
  };
  
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
    if(value.length>=1){
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
    }
      
    
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
    //获取用户的历史信息记录
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
    //获取用户全部的收藏
    axios.get('http://localhost:8080/collection/getByUserId', {
      params: {
        userId:localStorage.getItem('userId'),
      }
    })
    .then(response => {
      setCollections(response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
      //gpt获取几个热搜
      
    });
    //gpt获取几个热搜
    axios.get('http://localhost:8080/gpt/getHotSearch', {
      params: {
        cnt:'3',
      }
    })
    .then(response => {
      console.log(response.data.data)
      setGpt(response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    
  });

  axios.get('http://localhost:8080/search/mostSearched', {
    params: {
      cnt:'3',
    }
  })
  .then(response => {
    console.log(response.data.data)
    setHot(response.data.data.map(item=>item.content))
  })
  .catch(error => {
    // 处理请求错误
    console.error(error);
});

//返回评分最多的三个
axios.get('http://localhost:8080/evaluate/maxStar', {
  params: {
    cnt:'3',
  }
})
.then(response => {
  console.log('高分推荐',response.data)
  setAver(response.data.data)
})
.catch(error => {
  // 处理请求错误
  console.error(error);
});


  },[])

  return (
    <div className='header'>

      {/*header左侧栏目*/}
      <div className='headerSon' style={{fontSize:30}}>
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
                <Button style={{width:'100%', marginBottom:10}} onClick={showDrawer1}> 工作台(个人收藏)</Button><br/>
                <Button style={{width:'100%'}} onClick={()=>logout()}> logout</Button>
              </div>
              }
              >
             <div style={{margin:20}}>{localStorage.getItem('username')}</div>
            </Popover>

            {/*关于个人工作台*/}
            <Drawer title="个人收藏" onClose={onClose1} open={open1}>
                {collections.map(item=>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                  <KnowName ID={item.knowId}></KnowName>
                  <Button onClick={()=>{
                    axios.get('http://localhost:8080/collection/delete', {
                      params: {
                        knowId:item.knowId,
                        userId:localStorage.getItem('userId'),
                      }
                    })
                    .then(response => {
                      alert('移除成功, 刷新页面即可展示')
                    })
                    .catch(error => {
                      // 处理请求错误
                      console.error(error);
                    });

                  }}>移除</Button>
                  </div>
                )}
            </Drawer>
            
        </div>
      </div>
      
      {/*关于内容的小卡片*/}
      <EventTable isModalOpen={{open:isModalOpen, setOpen:()=>setIsModalOpen()}}></EventTable>
      <Message isModalOpen={{open:isModalOpen2, setOpen:()=>setIsModalOpen2()}}></Message>
      {/*
      <TagCon backgroundColor='yellow'></TagCon>
      */}
      <Drawer title="搜索历史" onClose={onClose} open={open}>
      <br/>你可能想搜?<br/><br/>
        {gpt.map(item=>{
          return <Tag>{item}</Tag>
        })}
        <br/><br/><hr/>
        <br/>热搜推荐<br/><br/>
        {hot.map(item=>{
          return <Tag>{item}</Tag>
        })}
        <br/><br/><hr/>
        <br/>高分推荐<br/><br/>
        {aver.map(item=>{
          return <Tag>{item.item}</Tag>
        })}
        <br/><br/><hr/>
        {searchRecords.map(item=>{
          return <div style={{margin:10,display:'flex',justifyContent:'space-between'}}
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
          ><div>{item.content}</div>
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