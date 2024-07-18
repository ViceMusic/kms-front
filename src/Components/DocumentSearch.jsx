import { Grid } from '@material-ui/core';
import './ComCss.css'
import { Breadcrumb ,Cascader,DatePicker, Drawer, Input} from 'antd';
import Search from 'antd/es/input/Search';
import { CloudUploadOutlined,FolderOutlined,FileOutlined,FileJpgOutlined ,SnippetsOutlined,EditOutlined,DeleteOutlined,RollbackOutlined, DiffFilled, DiffOutlined, FolderAddOutlined, ArrowDownOutlined, InfoCircleOutlined, FieldTimeOutlined   } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import { Button, Modal, Divider, Flex, Tree,Tag,Popover } from 'antd';
import { useEffect, useState,useContext } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import FileView from '../Tools/fileView';
import axios from 'axios';
import Info from './Info';
import { AuthContext } from '../AuthProvider';
const { Dragger } = Upload;



const options = [
  { 
  value: 'zhejiang',
  label: 'Zhejiang',
    },]


// 上传文件的时候的输入框的数据
const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: '0-0-0-0',
            key: '0-0-0-0',
          },
          {
            title: '0-0-0-1',
            key: '0-0-0-1',
          },
          {
            title: '0-0-0-2',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          {
            title: '0-0-1-0',
            key: '0-0-1-0',
          },
          {
            title: '0-0-1-1',
            key: '0-0-1-1',
          },
          {
            title: '0-0-1-2',
            key: '0-0-1-2',
          },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      {
        title: '0-1-0-0',
        key: '0-1-0-0',
      },
      {
        title: '0-1-0-1',
        key: '0-1-0-1',
      },
      {
        title: '0-1-0-2',
        key: '0-1-0-2',
      },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

// 关于文件上传的部分
const props = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

function DocumentSearch(props) {
  const {inSearch, setInSearch, searchs,SetSearchs }=useContext(AuthContext)
  //关于选中了哪个文件(这里可能需要大改)
  const [fileurl, setfileurl]=useState('')
  //关于文件预览弹窗的方式
  const [isModalOpen1,setIsModalOpen1]=useState(false)
  const show1=()=>{
      setIsModalOpen1(true)
  }
  //关于新增文件的弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    addFile()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //关于选择框
  const onChange = (value) => {
    console.log(value);
  };
  //浏览开关(切换列表和别的什么)
  const [switchOpen, setSwitchOpen]=useState(true)

  const onChangeSwitch = (value) => {
    setSwitchOpen(!switchOpen)
  };
  //关于数形控件
  const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  //关于新增文件夹的内容
  const [isModalOpenAddFolder, setIsModalOpenAddFolder] = useState(false);
  const [newFolder,setNewFolder]= useState('')
  const showModalAddFolder = () => {
    setIsModalOpenAddFolder(true);
  };
  const handleOkAddFolder = () => {
    console.log(
      {
        orgId:props.orgId,
        parentId:folderId,
        name:newFolder,
        authorId:11 //我知道可能是有点问题, 但是目前还是用管理员账号吧
      }
    )
    if(props.orgId==''){//目前还没有进入组织
      alert('请选择一个具体的组织进行文件夹的创建')
    }else{
      axios.get('http://localhost:8080/folder/insert', {
        params: {
          orgId:props.orgId,
          parentId:folderId,
          name:newFolder,
          authorId: localStorage.getItem('orgId') //我知道可能是有点问题, 但是目前还是用管理员账号吧
        }
      })
      .then(response => {
        console.log(response.data)
        alert('文件实现新增')
      })
      .catch(error => {
        // 处理请求错误
        console.error(error);
      });
    }
    setIsModalOpenAddFolder(false);
  };
  const handleCancelAddFolder = () => {
    setIsModalOpenAddFolder(false);
  };
  //关于修改文件夹的方法
  const [folderId, setFolderId]=useState('0')
  const [nameOfFolder, setNameOfFolder]=useState('')
  const [isModalOpenChangeFolder, setIsModalOpenChangeFolder] = useState(false);
  const showModalChangeFolder = (event) => {
    event.stopPropagation()//阻止事件的进一步冒泡
    setIsModalOpenChangeFolder(true);
  };
  //提交文件夹修改的功能
  const handleOkChangeFolder = () => {
    //重新命名
    axios.get('http://localhost:8080/folder/update', {
      params: {
        name:nameOfFolder,
        folderId:folderId
      }
    })
    .then(response => {
      alert('文件夹名称修改完成, 刷新页面予以显示')
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
    //关闭页面
    setIsModalOpenChangeFolder(false);
  };
  const handleCancelChangeFolder = () => {
    setIsModalOpenChangeFolder(false);
  };

  //删除文件夹的方法
  const deleteFolder=(event,item)=>{
    event.stopPropagation()//阻止事件进一步冒泡
    axios.get('http://localhost:8080/folder/delete', {
      params: {
        folderId:item.folderId
      }
    })
    .then(response => {
      alert('文件夹名称删除完成, 刷新页面予以显示')
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  }

  //修改文件/知识的方法
  const [fileId, setFileId]=useState('')
  const [isModalOpenUpdateFile, setIsModalOpenUpdateFile] = useState(false);
  const [newFileName, setNewFileName]=useState('')
  const [allowDown, setAllowDown]=useState(1)//允许下载和可以发布目前都设置为0
  const [allowPublish, setAllowPublish]=useState(1)

  const showModalUpdateFile = (event) => {//点击展示弹窗
    event.stopPropagation()//阻止事件的进一步冒泡
    setIsModalOpenUpdateFile(true);
  };
  const handleOkUpdateFile = (item) => { //确认弹窗内容
    axios.get('http://localhost:8080/knowledge/update', {
      params: {
        knowId:fileId,
        name:newFileName,
        download:allowDown,
        publish:allowPublish
      }
    })
    .then(response => {
      alert('文件夹名称删除完成, 刷新页面予以显示')
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
    setIsModalOpenUpdateFile(false);
  };
  const handleCancelUpdateFile = () => { //取消弹窗内容
    setIsModalOpenUpdateFile(false);
  };

  //增加文件/知识的方法
  const [filename,setFilename]=useState('')
  //当前组织和当前的文件夹分别为props.orgId, props.parentIds[props.parentIds.length-1]
  //userid为localstorage.getItem('username')
  const [url, setUrl]=useState('/src') //默认先为src
  const [fileType, setFileType]=useState('txt') //默认先为txt
  const [canDownload, setCanDownload]=useState('1') //默认允许下载
  const [canPublish, setCanPublish]=useState('1') //默认允许发布

  const addFile=()=>{
    axios.get('http://localhost:8080/knowledge/insert', {
      params: {
        name:filename,
        download:canDownload,
        publish:canPublish,
        type:fileType,
        url:url,
        folderId:props.parentIds[props.parentIds.length-1],
        orgId:props.orgId,
        userId:localStorage.getItem('userId')
      }
    })
    .then(response => {
      alert('知识新增完成, 刷新页面以获得最新的知识消息')
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  }


  //删除文件/知识的方法
  const deleteFile=(event,item)=>{
    event.stopPropagation()//阻止事件的进一步冒泡
    axios.get('http://localhost:8080/knowledge/delete', {
      params: {
        knowId:item.knowId
      }
    })
    .then(response => {
      alert('知识新增完成, 刷新页面以获得最新的知识消息')
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  }

  //根据文件序号获取该文件评论的方法
  const getCommentsByKnowId=(item)=>{
    axios.get('http://localhost:8080/evaluate/getByKnowId', {
      params: {
        knowId:item.knowId
      }
    })
    .then(response => {
      console.log(response.data)
      props.setComments(response.data.data?response.data.data:[])
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  }

  //关于浏览记录的弹窗
  const [open, setOpen] = useState(false);//弹窗
  const [browers,setBrowers]=useState([])//浏览记录

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const setBrowerRecord=(item)=>{
    //插入浏览信息
    axios.get('http://localhost:8080/browse/insert', {
      params: {
        userId:localStorage.getItem('userId'),
        knowId:item.knowId,
        tt:new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
    })
    .then(response => {
      console.log('成功添加记录',response.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
    //通过用户id获取该用户的浏览记录
    axios.get('http://localhost:8080/browse/getByUserId', {
      params: {
        userId:localStorage.getItem('userId'),
      }
    })
    .then(response => {
      setBrowers(response.data.data)
      console.log(response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });

  }

  


  useEffect(()=>{
    //通过用户id获取该用户的浏览记录
    axios.get('http://localhost:8080/browse/getByUserId', {
      params: {
        userId:localStorage.getItem('userId'),
      }
    })
    .then(response => {
      setBrowers(response.data.data)
      console.log(response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });

  },[])

  return (
    
    <div className='docu radium'>
      {/*上载和调整按钮*/}
      <div style={{display:'flex',justifyContent:'space-between' }}>
        <h1 style={{marginBottom:20}}>搜索结果展示</h1>
      </div>
      {/*文件夹的两种展示模式*/}
      <div style={{height:'80%',overflowY:'auto',overflowX:'hidden'}}>
        <Grid container spacing={2}>
            {/* 关于文件的具体部分*/}
            {searchs.map((item)=>
            (
                switchOpen?
                <Grid item xs={2}>
                  <div className='file-blocks' onClick={()=>{
                    props.setInfoShow('2')//展示文件信息
                    props.setFileMessage(item)
                    getCommentsByKnowId(item)
                    setBrowerRecord(item)//新增浏览记录
                }}
                onContextMenu={(event)=>{ //一个右键展示预览文件的方法, 后面可能回换成别的东西
                  //首先阻止浏览器自己的页面
                  event.preventDefault(); // 阻止浏览器默认的右键菜单
                  setfileurl(item.name)//这个是可以把数据传递到文件预览组件的, 比较吃性能所以采用这种格式
                  show1()
                  //将文件的修整和信息放在信息栏和别的啥
                }}
              >
                <Popover content={
                  <div>
                    <Button style={{marginBottom:10,border:'none' }} onClick={(e)=>{
                            axios.get('http://localhost:8080/user/check', {
                              params: {
                                knowId:item.knowId,
                                userId:localStorage.getItem('userId')
                              }
                            })
                            .then(response => {
                              const num=response.data.data
                                if(num==1){
                                  alert('您可以访问这个知识文件')
                                }else{
                                    alert('这个知识文件暂时不对您开放, 已经为您向原作者提出申请, 等待审批中')
                                    //提交审批内容
                                    axios.get('http://localhost:8080/approval/insert', {
                                      params: {
                                        knowId:item.knowId,
                                        userId:localStorage.getItem('userId')
                                      }
                                    })
                                    .then(response => {
                                      console.log('审批添加成功')
                                      
                                    })
                              }
                            })
                              
                            }}><ArrowDownOutlined/> 下载知识</Button><br/>
                            <Button style={{marginBottom:10,border:'none' }} onClick={(e)=>{
                              axios.get('http://localhost:8080/user/check', {
                                params: {
                                  knowId:item.knowId,
                                  userId:localStorage.getItem('userId')
                                }
                              })
                              .then(response => {
                                const num=response.data.data
                                if(num==1){
                                  alert('您可以访问这个知识文件')
                                }else{
                                  alert('这个知识文件暂时不对您开放, 已经为您向原作者提出申请, 等待审批中')
                                    //提交审批内容
                                    axios.get('http://localhost:8080/approval/insert', {
                                      params: {
                                        knowId:item.knowId,
                                        userId:localStorage.getItem('userId')
                                      }
                                    })
                                    .then(response => {
                                      console.log('审批添加成功')
                                      
                                    })
                                  
                                }
                              })
                              
                            }}><InfoCircleOutlined  /> 预览知识</Button><br/>
                          <Button style={{marginBottom:10,border:'none' }} onClick={(e)=>{
                            axios.get('http://localhost:8080/user/check', {
                              params: {
                                knowId:item.knowId,
                                userId:localStorage.getItem('userId')
                              }
                            })
                            .then(response => {
                              const num=response.data.data
                              if(num==1){
                                showModalUpdateFile(e)
                                setFileId(item.knowId) //点击选中某个文件
                              }else{
                                alert('这个知识文件暂时不对您开放, 已经为您向原作者提出申请, 等待审批中')
                                //提交审批内容
                                axios.get('http://localhost:8080/approval/insert', {
                                  params: {
                                    knowId:item.knowId,
                                    userId:localStorage.getItem('userId')
                                  }
                                })
                                .then(response => {
                                  console.log('审批添加成功')
                                  
                                })
                              }
                            })

                            }}><EditOutlined /> 修改知识</Button><br/>
                          <Button style={{marginBottom:10,border:'none' }}onClick={(e)=>{
                            axios.get('http://localhost:8080/user/check', {
                              params: {
                                knowId:item.knowId,
                                userId:localStorage.getItem('userId')
                              }
                            })
                            .then(response => {
                              const num=response.data.data
                              if(num==1){
                                deleteFile(e,item)
                              }else{
                                alert('这个知识文件暂时不对您开放, 已经为您向原作者提出申请, 等待审批中')
                                //提交审批内容
                                axios.get('http://localhost:8080/approval/insert', {
                                  params: {
                                    knowId:item.knowId,
                                    userId:localStorage.getItem('userId')
                                  }
                                })
                                .then(response => {
                                  console.log('审批添加成功')
                                  
                                })
                              }
                            })

                            }}><DeleteOutlined />删除知识</Button>
                  </div>
                } >
                  <div style={{ height:100, width:100}}>
                    {/*点击页面实现功能*/}
                     <SnippetsOutlined  style={{fontSize:100}}/> 
                    </div>
                  <div style={{ textAlign:'center'}}>{item.name}</div>

                </Popover>
              </div>
          </Grid>
            :
          <Grid  item xs={12}
            onClick={()=>{
              props.setInfoShow('2')
              props.setFileMessage(item)
              getCommentsByKnowId(item)
              setBrowerRecord(item)//新增浏览记录
          }}
          onContextMenu={(event)=>{
            event.preventDefault(); // 阻止浏览器默认的右键菜单
            setfileurl(item.name)//这个是可以把数据传递到文件预览组件的, 比较吃性能所以采用这种格式
            show1()
          }}
            style={{margin:10, backgroundColor:'white',padding:10, borderRadius:10}}> 
                  <SnippetsOutlined  style={{marginRight:10}}/> 
                  <Popover content={
                        <div>
                          <Button style={{marginBottom:10,border:'none' }} onClick={(e)=>{
                            axios.get('http://localhost:8080/user/check', {
                              params: {
                                knowId:item.knowId,
                                userId:localStorage.getItem('userId')
                              }
                            })
                            .then(response => {
                              const num=response.data.data
                              if(num==1){
                                alert('您可以访问这个知识文件')
                              }else{
                                alert('这个知识文件暂时不对您开放, 已经为您向原作者提出申请, 等待审批中')
                                //提交审批内容
                                axios.get('http://localhost:8080/approval/insert', {
                                  params: {
                                    knowId:item.knowId,
                                    userId:localStorage.getItem('userId')
                                  }
                                })
                                .then(response => {
                                  console.log('审批添加成功')
                                  
                                })
                              }
                            })
                              
                            }}><ArrowDownOutlined  /> 下载知识</Button><br/>
                            <Button style={{marginBottom:10,border:'none' }} onClick={(e)=>{
                              axios.get('http://localhost:8080/user/check', {
                                params: {
                                  knowId:item.knowId,
                                  userId:localStorage.getItem('userId')
                                }
                              })
                              .then(response => {
                                const num=response.data.data
                                if(num==1){
                                  alert('您可以访问这个知识文件')
                                }else{
                                  alert('这个知识文件暂时不对您开放, 已经为您向原作者提出申请, 等待审批中')
                                  //提交审批内容
                                  axios.get('http://localhost:8080/approval/insert', {
                                    params: {
                                      knowId:item.knowId,
                                      userId:localStorage.getItem('userId')
                                    }
                                  })
                                  .then(response => {
                                    console.log('审批添加成功')
                                    
                                  })
                                }
                              })
                              
                            }}><InfoCircleOutlined  /> 预览知识</Button><br/>
                          <Button style={{marginBottom:10,border:'none' }} onClick={(e)=>{
                            axios.get('http://localhost:8080/user/check', {
                              params: {
                                knowId:item.knowId,
                                userId:localStorage.getItem('userId')
                              }
                            })
                            .then(response => {
                              const num=response.data.data
                              if(num==1){
                                showModalUpdateFile(e)
                                setFileId(item.knowId) //点击选中某个文件
                              }else{
                                alert('这个知识文件暂时不对您开放, 已经为您向原作者提出申请, 等待审批中')
                                //提交审批内容
                                axios.get('http://localhost:8080/approval/insert', {
                                  params: {
                                    knowId:item.knowId,
                                    userId:localStorage.getItem('userId')
                                  }
                                })
                                .then(response => {
                                  console.log('审批添加成功')
                                  
                                })
                              }
                            })

                            }}><EditOutlined /> 修改知识</Button><br/>
                          <Button style={{marginBottom:10,border:'none' }}onClick={(e)=>{
                            axios.get('http://localhost:8080/user/check', {
                              params: {
                                knowId:item.knowId,
                                userId:localStorage.getItem('userId')
                              }
                            })
                            .then(response => {
                              const num=response.data.data
                              if(num==1){
                                deleteFile(e,item)
                              }else{
                                alert('这个知识文件暂时不对您开放, 已经为您向原作者提出申请, 等待审批中')
                                //提交审批内容
                                axios.get('http://localhost:8080/approval/insert', {
                                  params: {
                                    knowId:item.knowId,
                                    userId:localStorage.getItem('userId')
                                  }
                                })
                                .then(response => {
                                  console.log('审批添加成功')
                                  
                                })
                              }
                            })

                            }}><DeleteOutlined />删除知识</Button>
                        </div>
                      } >  {item.name}
                </Popover>
            </Grid>
            ))}
        </Grid>
        {/*文件浏览组件(暂时先不用管, 逐个渲染太吃性能)*/}
        <FileView fileurl={fileurl} isModalOpen={{open:isModalOpen1, setOpen:()=>setIsModalOpen1()}} />
        {/*修改文件夹名字的弹窗*/}
        <Modal title="修改文件夹名字" open={isModalOpenChangeFolder} onOk={handleOkChangeFolder} onCancel={handleCancelChangeFolder}>
            <Input onChange={(e)=>{
                setNameOfFolder(e.target.value)
              }}></Input>
        </Modal>
        <Modal title="修改文件信息" open={isModalOpenUpdateFile} onOk={handleOkUpdateFile} onCancel={handleCancelUpdateFile}>
            <Input onChange={(e)=>{
                setNewFileName(e.target.value)//修改文件内容
                //(这里可以是允许发行和允许下载的按钮)

              }}></Input>
        </Modal>
        <Drawer title="历史浏览记录" onClose={onClose} open={open}>
        <Button onClick={
           ()=>{
            axios.get('http://localhost:8080/browse/deleteByUserId', {
              params: {
                userId:localStorage.getItem('userId')
              }
            })
            .then(response => {
              console.log(response.data.data)
            })
            .catch(error => {
              // 处理请求错误
              console.error(error);
            })
           }
        }>清空该用户浏览记录</Button> <br></br><br></br>
         {browers.map((item)=>{
              return <>
              <div> 
                访问文件:{item.browseId}
                访问时间:{item.tt}
                <Button onClick={
                  ()=>{
                    alert('已经删除')
                    axios.get('http://localhost:8080/browse/deleteByBrowseId', {
                      params: {
                        browseId:item.browseId
                      }
                    })
                    .then(response => {
                    })
                    .catch(error => {
                      // 处理请求错误
                      console.error(error);
                    })
                  }
                }>删除该浏览记录</Button>
              </div><br></br><br></br>
              </>
         })}
      </Drawer>
      </div>
      

    </div>
  );
}

export default  DocumentSearch;

