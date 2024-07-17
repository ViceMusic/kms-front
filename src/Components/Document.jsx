import { Grid } from '@material-ui/core';
import './ComCss.css'
import { Breadcrumb ,Cascader,DatePicker, Input} from 'antd';
import Search from 'antd/es/input/Search';
import { CloudUploadOutlined,FolderOutlined,FileOutlined,FileJpgOutlined ,SnippetsOutlined,EditOutlined,DeleteOutlined,RollbackOutlined, DiffFilled, DiffOutlined, FolderAddOutlined   } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import { Button, Modal, Divider, Flex, Tree,Tag,Popover } from 'antd';
import { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import FileView from '../Tools/fileView';
import axios from 'axios';
const { Dragger } = Upload;



const options = [
  { 
  value: 'zhejiang',
  label: 'Zhejiang',
    },]

const files=[
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
]

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

function Document(props) {
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

  //进入文件夹内部
  const [inFolder, setInFolder]=useState(false)
  //进入文件夹以后
  const accessFolder=(item)=>{ //参数为当前文件的信息
    setFolderId(item.folderId)
    //先修改parents
    props.setParentIds([...props.parentIds, item.folderId+''])
    console.log('进入文件夹', item.folderId)
    //然后设置进入的文件夹
    setInFolder(true)
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
    const a=props.orgId
    const arr = props.parentIds
    arr.pop()
    console.log(arr)
    props.setParentIds(arr)
    if(arr.length==1){
      setInFolder(false)
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


  useEffect(()=>{

  },[])

  return (
    <div className='docu radium'>
      {/*上载和调整按钮*/}
      <div style={{display:'flex',justifyContent:'space-between' }}>
        <h1 style={{marginBottom:20}}>文件列表(9)</h1>
        <div className='div-center' style={{fontSize:40}}>
          {props.org}
              {/*回滚按钮(用于在文件夹中进行回退)*/}
              {inFolder && <RollbackOutlined style={{marginRight:20}} onClick={exitFolder}/>}
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
                    {/*文件上传框*/}
                     <div style={{height:120, margin:10, marginBottom:50}}>
                      <Dragger {...props} >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">点击上传文件</p>
                      </Dragger>
                     </div>
                     {/* 文件名称 */}
                     <div>
                      <span style={{color:'red'}}>*</span>文件名称:
                      <Input placeholder='输入文件名称' onChange={(e)=>{setFilename(e.target.value)}}></Input>
                     </div>
                     
                     {/* 标签 */}
                     <div style={{margin:10, marginTop:30}}>
                      <Tag color="magenta">magenta</Tag>
                      <Tag color="red">red</Tag>
                      <Tag color="volcano">volcano</Tag>
                      <Tag color="lime">+</Tag>
                     </div>
                     {/* 上传路径 */}
                     <div style={{margin:10, marginTop:30}}>
                        一级目录/二级目录
                     </div>


                  </div>
                  <div style={{
                    width:600,
                  }}>
                    <Tree
                      checkable
                      onExpand={onExpand}
                      expandedKeys={expandedKeys}
                      autoExpandParent={autoExpandParent}
                      onCheck={onCheck}
                      checkedKeys={checkedKeys}
                      onSelect={onSelect}
                      selectedKeys={selectedKeys}
                      treeData={treeData}
                      style={{
                         backgroundColor:'rgb(229, 229, 229)',
                         margin:5,
                         overflow:'auto',
                         border:'none',
                         borderRadius:8
                      }}
                    />
                  </div>
                </div>
              </Modal>
              <Switch style={{margin:20}} checkedChildren="图标" unCheckedChildren="条目" defaultChecked onChange={onChangeSwitch} />
        </div>
      </div>

      {/* 检测文件列表数目*/}
      

      {/*面包屑导航*/}
      <Breadcrumb
        items={[
          {title: 'Home',},
          {title: <a href="">Application Center</a>,},
          {title: <a href="">Application List</a>,},
          {title: 'An Application',},
        ]}
        />

      {/*下拉框子*/}
      <div style={{display:'flex', justifyContent:'space-between'}}>
        {/*关于日期*/}
        <div>
          <Cascader style={{margin:10,width:150}} options={options} onChange={onChange} placeholder="Please select" />
          <Cascader style={{margin:10,width:150}} options={options} onChange={(value)=> console.log(value)} placeholder="Please select" />
          <DatePicker  style={{width:200}} onChange={(date, dateString) => { console.log(date, dateString);}} needConfirm />
        </div>
        {/*文件上传按钮*/}

        {/*关于搜索框*/}
        <Search placeholder="input search text" style={{width:400}} className='div-center' onSearch={(value)=>{console.log("")}} enterButton  /> 
        {/*一些关于文件夹和乱七八糟的东西(具体的文件内容)*/}
      </div>

      {/*文件的两种展示模式*/}
      <div style={{height:'80%',overflowY:'auto',overflowX:'hidden'}}>
        <Grid container spacing={2}>
          {props.folders.map((item)=>
            (
                switchOpen?
                <Grid item xs={2}>
                  <div className='file-blocks' onClick={()=>{
                    props.setInfoShow('1')//展示文件信息
                    props.setMsg(item.name) //设置文件名字
                    accessFolder(item)
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
                      showModalChangeFolder(e)
                      setFolderId(item.folderId)
                    }}><EditOutlined />重命名文件夹</Button><br/>
                    
                    <Button style={{marginBottom:10,border:'none' }} onClick={(e)=>{
                      deleteFolder(e,item)
                    }}><DeleteOutlined />删除文件夹</Button>
                  </div>
                } >
                  <div style={{ height:100, width:100}}>
                    {/*点击页面实现功能
                    */}
                     <FolderOutlined  style={{fontSize:100, color:'orange'}} onClick={()=>setInFolder(true)}/> 
                    </div>
                  <div style={{ textAlign:'center'}}>{item.name}</div>

                </Popover>
              </div>
          </Grid>
            :
          <Grid  item xs={12}
            onClick={()=>{
              props.setInfoShow('1')
              props.setMsg(item.name)
              accessFolder(item)
          }}
          onContextMenu={(event)=>{
            //首先阻止浏览器自己的页面
            event.preventDefault(); // 阻止浏览器默认的右键菜单
            setfileurl(item.name)//这个是可以把数据传递到文件预览组件的, 比较吃性能所以采用这种格式
            show1()
            //将文件的修整和信息放在信息栏和别的啥
          }}
            style={{margin:10, backgroundColor:'white',padding:10, borderRadius:10}}> 
                  <FolderOutlined  style={{marginRight:10}}/> 
                  <Popover content={
                        <div>
                          <Button style={{marginBottom:10,border:'none' }} onClick={(e)=>{
                              showModalChangeFolder(e)
                              setFolderId(item.folderId)
                            }}><EditOutlined />重命名文件夹</Button><br/>
                          <Button style={{marginBottom:10,border:'none' }}onClick={(e)=>{
                              deleteFolder(e,item)
                            }}><DeleteOutlined />删除文件夹</Button>
                        </div>
                      } >  {item.name}
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
                      showModalUpdateFile(e) //展示弹窗
                      setFileId(item.knowId) //点击选中某个文件
                    }}><EditOutlined />编辑知识</Button><br/>
                    
                    <Button style={{marginBottom:10,border:'none' }} onClick={(e)=>{
                      deleteFile(e,item)
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
                              showModalUpdateFile(e)
                              setFileId(item.knowId) //点击选中某个文件
                            }}><EditOutlined /> 修改知识</Button><br/>
                          <Button style={{marginBottom:10,border:'none' }}onClick={(e)=>{
                              alert('删除知识')
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
      </div>
      

    </div>
  );
}

export default  Document;

/*
              switchOpen?
              <Grid xs={2}>
                每一个图片都有对应的模块
                 右键点击实现预览, 左键点击实现基本信息展示
                <div className='file-blocks' onClick={()=>{
                  props.setInfoShow('2')
                  props.setMsg(item.name)
              }}
              onContextMenu={(event)=>{
                //首先阻止浏览器自己的页面
                event.preventDefault(); // 阻止浏览器默认的右键菜单
                setfileurl(item.name)//这个是可以把数据传递到文件预览组件的, 比较吃性能所以采用这种格式
                show1()
                //将文件的修整和信息放在信息栏和别的啥
              }}
            >
              <Popover content={
                <div>
                  <Button style={{marginBottom:10,border:'none' }}><EditOutlined />修改知识</Button><br/>
                  <Button style={{marginBottom:10,border:'none' }}><DeleteOutlined />删除知识</Button>
                </div>
              } >
                <div style={{ height:100, width:100}}>
                  {    item.type==1 && <FolderOutlined  style={{fontSize:100, color:'orange'}}/> }
                  {    item.type==2 && <FileOutlined   style={{fontSize:100}}/> }
                  {    item.type==3 && <FileJpgOutlined   style={{fontSize:100,color:'red'}}/> }
                  </div>
                <div style={{ textAlign:'center'}}>{item.name}</div>

              </Popover>
            </div>
        </Grid>
          :
          
        <Grid xs={12}
          onClick={()=>{
            props.setInfoShow('2')
            props.setMsg(item.name)
        }}
        onContextMenu={(event)=>{
          //首先阻止浏览器自己的页面
          event.preventDefault(); // 阻止浏览器默认的右键菜单
          setfileurl(item.name)//这个是可以把数据传递到文件预览组件的, 比较吃性能所以采用这种格式
          show1()
          //将文件的修整和信息放在信息栏和别的啥
        }}
          style={{margin:10, backgroundColor:'white',padding:10, borderRadius:10}}> 
                  {    item.type==1 && <FolderOutlined  style={{marginRight:10}}/> }
                  {    item.type==2 && <FileOutlined    style={{marginRight:10}}/> }
                  {    item.type==3 && <FileJpgOutlined style={{marginRight:10}}/> }
                <Popover content={
                      <div>
                        <Button style={{marginBottom:10,border:'none' }}><EditOutlined />修改知识</Button><br/>
                        <Button style={{marginBottom:10,border:'none' }}><DeleteOutlined />删除知识</Button>
                      </div>
                    } >  {item.name}
              </Popover>
          </Grid>
*/