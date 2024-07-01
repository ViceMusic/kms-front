import { Grid } from '@material-ui/core';
import './ComCss.css'
import { Breadcrumb ,Cascader,DatePicker, Input} from 'antd';
import Search from 'antd/es/input/Search';
import { CloudUploadOutlined  } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import { Button, Modal, Divider, Flex, Tree,Tag } from 'antd';
import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
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

function Document() {
  //关于新增文件的弹窗
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //关于选择框
  const onChange = (value) => {
    console.log(value);
  };
  //关于数形控件
  const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
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

  return (
    <div className='docu radium'>
      {/*上载和调整按钮*/}
      <div style={{display:'flex',justifyContent:'space-between' }}>
        <h1 style={{marginBottom:20}}>文件列表(9)</h1>
        <div className='div-center' style={{fontSize:40}}>
              {/*文件弹窗*/}
              <CloudUploadOutlined onClick={showModal}/>
              {/*文件传输具体按钮*/}
              <Modal title="上传文件" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{display:'flex', justifyContent:'center'}}>
                  <div style={{

                    width:600,
  
                  }}>
                    {/*文件上传框*/}
                     <div style={{height:120, margin:10}}>
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
                      <Input placeholder='输入文件名称'></Input>
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
              <Switch style={{margin:20}} checkedChildren="图标" unCheckedChildren="条目" defaultChecked />
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

      {/*文件的块状转化模式*/}
      <div style={{height:'80%',overflowY:'auto',overflowX:'hidden'}}>
        <Grid container spacing={2}>
          {
          files.map((item)=><Grid xs={2}>
              <div className='file-blocks'>
                <div  style={{backgroundColor:'grey', height:100, width:100}}></div>
                {item.name}
               
              </div>
          </Grid>)
        }
        </Grid>


      </div>

    </div>
  );
}

export default  Document;