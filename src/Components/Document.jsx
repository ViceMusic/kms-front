import { Grid } from '@material-ui/core';
import './ComCss.css'
import { Breadcrumb ,Cascader,DatePicker, Drawer, Input} from 'antd';
import Search from 'antd/es/input/Search';
import { CloudUploadOutlined,FolderOutlined,FileOutlined,FileJpgOutlined ,SnippetsOutlined,EditOutlined,DeleteOutlined,RollbackOutlined, DiffFilled, DiffOutlined, FolderAddOutlined, ArrowDownOutlined, InfoCircleOutlined, FieldTimeOutlined,FilePdfOutlined,FileImageOutlined  } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import { Button, Modal, Divider, Flex, Tree,Tag,Popover } from 'antd';
import { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import FileView from '../Tools/fileView';
import axios from 'axios';
import Info from './Info';
const { Dragger } = Upload;


//关于文件上传的函数




function Document(props) {
  //关于文件上传的部分
  //关于选中了什么文件知识(直接设置src)
  const [fileMsg, setFileMsg]=useState({})
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

  //关于新增文件夹的内容
  const [isModalOpenAddFolder, setIsModalOpenAddFolder] = useState(false);
  const [newFolder,setNewFolder]= useState('')
  const showModalAddFolder = () => {
    setIsModalOpenAddFolder(true);
  };
  const handleOkAddFolder = () => {
    if(props.orgId==''){//目前还没有进入组织
      alert('请选择一个具体的组织进行文件夹的创建')
    }else{
      axios.get('http://localhost:8080/folder/insert', {
        params: {
          orgId:props.orgId,
          parentId:props.folderId, //确实是这里除了问题
          name:newFolder,
          authorId: localStorage.getItem('userId') 
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

  //进入文件夹内部
  
  //进入文件夹以后
  const accessFolder=(item)=>{ //参数为当前文件的信息
    props.setFolderId(item.folderId)
    //先修改parents
    props.setParentIds([...props.parentIds, item.folderId+''])
    console.log('进入文件夹', item.folderId)
    //然后设置进入的文件夹
    props.setInFolder(true)
    console.log({
      orgId:props.orgId,
      parentId:item.folderId+''
    })
    //获取更新全部的文件夹
    axios.get('http://localhost:8080/folder/getByParentIdAndOrgId', {
      params: {
        orgId:props.orgId,
        parentId:item.folderId+''
      }
    })
    .then(response => {
      console.log(response.data)
      props.setFolders(response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });

    //获取更新全部的文件
    axios.get('http://localhost:8080/knowledge/getByFolderIdAndOrgId', {
      params: {
        orgId:props.orgId,
        folderId:item.folderId+''
      }
    })
    .then(response => {
      console.log('获取文件为',response.data)
      props.setFiles(response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  }
  //从文件夹中退出
  const exitFolder=()=>{
    //先设置一下parentIds的长度
    const a = props.orgId
    const arr = props.parentIds
    arr.pop()
    console.log(arr)
    props.setParentIds(arr)
    if(arr.length==1){
      props.setInFolder(false)
    }

    axios.get('http://localhost:8080/folder/getByParentIdAndOrgId', {
      params: {
        orgId:props.orgId,
        parentId:arr[arr.length-1]
      }
    })
    .then(response => {
      props.setFolders(response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });

  }
  //关于修改文件夹的方法
  
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
        folderId:props.folderId
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
      alert('文件夹名称更新完成, 刷新页面予以显示')
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
  const [fileType, setFileType]=useState('txt') //默认先为txt
  const [canDownload, setCanDownload]=useState('1') //默认允许下载
  const [canPublish, setCanPublish]=useState('1') //默认允许发布

  const addFile=()=>{
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      fetch('http://localhost:3010/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded successfully:', data.fileName);

        axios.get('http://localhost:8080/knowledge/insert', {
          params: {
            name:filename,
            download:canDownload,
            publish:canPublish,
            type:data.fileName.split('.').length > 1 ? data.fileName.split('.').pop() : '未知',
            url:data.fileName,
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
        
        
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    } else {
      console.error('No file selected.');
    }

    
    //关于文件的新增
    
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
      alert('删除完成, 刷新页面以获得最新的知识消息')
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
    //删除文件
    axios.get('http://localhost:3010/deleteFile', {
      params: {
        fileName:item.url
      }
    })
    .then(response => {
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
    //删除文件
  }

  //根据文件序号获取该文件评论的方法
  const getCommentsByKnowId=(item)=>{
    axios.get('http://localhost:8080/evaluate/getByKnowId', {
      params: {
        knowId:item.knowId
      }
    })
    .then(response => {
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
        <h1 style={{marginBottom:20}}>文件列表</h1>
        <div className='div-center' style={{fontSize:40}}>
          {props.org}
              {/*历史浏览记录*/}
              <FieldTimeOutlined style={{marginRight:20}} onClick={showDrawer}/>
              {/*回滚按钮(用于在文件夹中进行回退)*/}
              {props.inFolder && <RollbackOutlined style={{marginRight:20}} onClick={exitFolder}/>}
              {/*文件弹窗*/}
              <FolderAddOutlined style={{marginRight:20}} onClick={showModalAddFolder}/>
              <Modal  title="新增文件夹" open={isModalOpenAddFolder} onOk={handleOkAddFolder} onCancel={handleCancelAddFolder}>
                <Input onChange={(e)=>setNewFolder(e.target.value)}/>
              </Modal>
              {/*文件(知识)上传按钮*/}
              <DiffOutlined style={{marginRight:10}} onClick={showModal}/>
              <Modal title="上传文件" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{display:'flex', justifyContent:'center'}}>
                  <div style={{
                    width:600,
                  }}>
                    {/*文件名称框*/}
                    <span style={{color:'red'}}>*</span>文件名称:
                      <Input placeholder='输入文件名称' onChange={(e)=>{setFilename(e.target.value)}}></Input>
                    {/*文件上传框*/}
                     <div style={{height:30, margin:10, marginBottom:50}}>
                        <input type="file" id="fileInput" />
                        
                     </div>
                     
                     <div>
                      
                     </div>
                     
                     {/* 标签 */}
                     <div style={{margin:10, marginTop:20}}>
                     </div>
                     


                  </div>
                 
                </div>
              </Modal>
              <Switch style={{margin:20}} checkedChildren="图标" unCheckedChildren="条目" defaultChecked onChange={onChangeSwitch} />
        </div>
      </div>

      {/* 检测文件列表数目*/}
      

      

      {/*文件夹的两种展示模式*/}
      <div style={{height:'80%',overflowY:'auto',overflowX:'hidden'}}>
        <Grid container spacing={2}>
          {props.folders.map((item)=>
            (
                switchOpen?
                <Grid item xs={2}>
                  <div className='file-blocks' onClick={()=>{
                    props.setInfoShow('3')//展示文件夹信息
                    props.setMsg(item.name) //设置文件夹名字
                    props.setFolderMessage(item)
                    accessFolder(item)
                }}
              >
                <Popover content={
                  <div>
                    <Button style={{marginBottom:10,border:'none' }} onClick={(e)=>{
                      showModalChangeFolder(e)
                      props.setFolderId(item.folderId)
                    }}><EditOutlined />重命名文件夹</Button><br/>
                    
                    <Button style={{marginBottom:10,border:'none' }} onClick={(e)=>{
                      deleteFolder(e,item)
                    }}><DeleteOutlined />删除文件夹</Button>
                  </div>
                } >
                  <div style={{ height:100, width:100}}>
                    {/*点击页面实现功能
                    */}
                     <FolderOutlined  style={{fontSize:100, color:'orange'}} onClick={()=>props.setInFolder(true)}/> 
                    </div>
                  <div style={{ textAlign:'center'}}>{item.name.length > 4 ? `${item.name.slice(0, 4)}...` : item.name}</div>

                </Popover>
              </div>
          </Grid>
            :
          <Grid  item xs={12}
            onClick={()=>{
              props.setInfoShow('3')
              props.setMsg(item.name)
              props.setFolderMessage(item)
              accessFolder(item)
          }}
          onContextMenu={(event)=>{
            //首先阻止浏览器自己的页面
            event.preventDefault(); // 阻止浏览器默认的右键菜单
            show1()
            //将文件的修整和信息放在信息栏和别的啥
          }}
            style={{margin:10, backgroundColor:'white',padding:10, borderRadius:10}}> 
                  <FolderOutlined  style={{marginRight:10}}/> 
                  <Popover content={
                        <div>
                          <Button style={{marginBottom:10,border:'none' }} onClick={(e)=>{
                              showModalChangeFolder(e)
                              props.setFolderId(item.folderId)
                            }}><EditOutlined />重命名文件夹</Button><br/>
                          <Button style={{marginBottom:10,border:'none' }}onClick={(e)=>{
                              deleteFolder(e,item)
                            }}><DeleteOutlined />删除文件夹</Button>
                        </div>
                      } >  {item.name.length > 4 ? `${item.name.slice(0, 4)}...` : item.name}
                </Popover>
            </Grid>
            ))}


            {/* 关于文件的具体部分*/}
            {props.files.map((item)=>
            (
                switchOpen?
                <Grid item xs={2}>
                  <div className='file-blocks' onClick={()=>{
                    props.setInfoShow('2')//展示文件信息
                    props.setFileMessage(item)
                    getCommentsByKnowId(item)
                    setBrowerRecord(item)//新增浏览记录
                    //展示平均分数, 但是服务器爆出500错误
                    axios.get('http://localhost:8080/evaluate/getAvg', {
                      params: {
                        knowId:item.knowId,
                      }
                    })
                    .then(response => {
                      console.log('平均分',response.data.data)
                      props.setAverageStar(response.data.data)
                    })
                }}
                onContextMenu={(event)=>{ //一个右键展示预览文件的方法, 后面可能回换成别的东西
                  //首先阻止浏览器自己的页面
                  event.preventDefault(); // 阻止浏览器默认的右键菜单
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
                                  axios.get(`http://localhost:3010/download/`+item.url, { responseType: 'blob' })
                                        .then(response => {
                                          // 创建一个用于下载的 URL
                                          const downloadUrl = URL.createObjectURL(response.data);

                                          // 创建一个临时的 <a> 标签并模拟点击下载
                                          const tempLink = document.createElement('a');
                                          tempLink.href = downloadUrl;
                                          tempLink.setAttribute('download', item.url);
                                          tempLink.style.display = 'none';
                                          document.body.appendChild(tempLink);
                                          tempLink.click();

                                          // 清理临时资源
                                          document.body.removeChild(tempLink);
                                          URL.revokeObjectURL(downloadUrl);
                                        })
                                        .catch(error => {
                                          console.error('Error downloading file:', error);
                                        });
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
                                  setFileMsg(item)//这个是可以把数据传递到文件预览组件的, 比较吃性能所以采用这种格式
                                  show1()
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
                            //改成只有作者可以删除文件
                            if(item.userId==localStorage.getItem('userId')){
                              deleteFile(e,item)
                              //除了要删除数据库还要删除文件内容
                            }else{
                              alert('只有作者才能删除文件')
                            }
                            }}><DeleteOutlined />删除知识</Button>
                  </div>
                } >
                  <div style={{ height:100, width:100}}>
                    {/*点击页面实现功能*/}
                    {item.type=='pdf' && <FilePdfOutlined   style={{fontSize:100}}/> }
                    {(item.type=='png'||item.type=='jpg') && <FileImageOutlined    style={{fontSize:100}}/> }
                    {(item.type!='pdf'&&item.type!='png'&&item.type!='jpg') && <SnippetsOutlined  style={{fontSize:100}}/> }
                    </div>
                  <div style={{ textAlign:'center'}}>{item.name.length > 4 ? `${item.name.slice(0, 4)}...` : item.name}</div>

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

          }}
            style={{margin:10, backgroundColor:'white',padding:10, borderRadius:10}}> 
                  {item.type=='pdf' && <FilePdfOutlined   style={{marginRight:10}}/> }
                    {(item.type=='png'||item.type=='jpg') && <FileImageOutlined    style={{marginRight:10}}/> }
                    {(item.type!='pdf'&&item.type!='png'&&item.type!='jpg') && <SnippetsOutlined  style={{marginRight:10}}/> }
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
                                axios.get(`http://localhost:3010/download/`+item.url, { responseType: 'blob' })
                                        .then(response => {
                                          // 创建一个用于下载的 URL
                                          const downloadUrl = URL.createObjectURL(response.data);

                                          // 创建一个临时的 <a> 标签并模拟点击下载
                                          const tempLink = document.createElement('a');
                                          tempLink.href = downloadUrl;
                                          tempLink.setAttribute('download', item.url);
                                          tempLink.style.display = 'none';
                                          document.body.appendChild(tempLink);
                                          tempLink.click();

                                          // 清理临时资源
                                          document.body.removeChild(tempLink);
                                          URL.revokeObjectURL(downloadUrl);
                                        })
                                        .catch(error => {
                                          console.error('Error downloading file:', error);
                                        });
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
                                  setFileMsg(item)//这个是可以把数据传递到文件预览组件的, 比较吃性能所以采用这种格式
                                  show1()
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
                            
                              //改成只有作者可以删除文件
                              if(item.userId==localStorage.getItem('userId')){
                                deleteFile(e,item)
                                //除了要删除数据库还要删除文件内容
                              }else{
                                alert('只有作者才能删除文件')
                              }
                

                            }}><DeleteOutlined />删除知识</Button>
                        </div>
                      } >  {item.name.length > 4 ? `${item.name.slice(0, 4)}...` : item.name}
                </Popover>
            </Grid>
            ))}
        </Grid>
        {/*文件浏览组件(根据文件的src进行预览文件)*/}
        <FileView fileMsg={fileMsg} isModalOpen={{open:isModalOpen1, setOpen:()=>setIsModalOpen1()}} />
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

export default  Document;

