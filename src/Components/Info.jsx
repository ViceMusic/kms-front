import './ComCss.css'
import { Rate,Avatar, Button, Tag, Modal} from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useEffect, useState } from 'react';
import { Input } from 'antd';
import axios from 'axios';
import { useNavigate, useNavigation } from 'react-router-dom';
const { TextArea } = Input;

 const comments=[
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
]


function Info(props) {
  //路由导航, 不过在这个组件下面好像没啥用
  const navi=useNavigate()
  // 评论的打分
  const [star, setStar]=useState(0)
  // 评论框的内容
  const [value, setValue] = useState('');
  // 修改组织的名称
  const [orgName, setOrgName] = useState('')
  const [isShowChange, setIsShowChange]=useState(false)
  const showModalChange = () => {
    setIsShowChange(true);
  };
  const handleOkChange = () => {
    console.log(orgName)
    //选中确定进行修改
    axios.get('http://localhost:8080/org/update', {
      params: {
        orgId: props.msg,
        name: orgName
      }
    })
    .then(response => {
      alert('修改完成, 刷新页面即可看到')
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
    setIsShowChange(false);
  };
  const handleCancelChange = () => {
    setIsShowChange(false);
  };
  // 确定删除组织
  const [isShowDelete, setIsShowDelete]=useState(false)
  const showModalDelete = () => {
    setIsShowDelete(true);
  };
  const handleOkDelete = () => {
    //删除该组织的回调函数
    axios.get('http://localhost:8080/org/deleteByOrgId', {
      params: {
        orgId: props.msg
      }
    })
    .then(response => {
      alert('组织删除完成, 请刷新页面')
    })
    .catch(error => {
      console.error(error);
      console.log(props.msg)
    });
    setIsShowDelete(false);
  };
  const handleCancelDelete = () => {
    setIsShowDelete(false);
  };
  // 新增组织(有id, 可以根据id获取到基本信息, 然后实现新增, 主要是新增的时候需要新增到数据)
  const [isShowAdd, setIsShowAdd]=useState(false)
  const [newOrg, setNewOrg]= useState('') //新组织的名称
  const showModalAdd = () => {
    setIsShowAdd(true);
  };
  const handleOkAdd = () => {
    //在对应的目录下新增组织
    
    axios.get('http://localhost:8080/org/insert', {
      params: {
        name:newOrg,
        parentId:props.orgMessage.orgId
      }
    })
    .then(response => {
      alert('新增组织成功, 请刷新页面展示')
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
    
    setIsShowAdd(false);
  };
  const handleCancelAdd = () => {
    setIsShowAdd(false);
  };
  return (
    <div className='info radium'> 
    {/* 暂时没有展示信息的对应格式*/}
    {props.infoShow=='0' && "请点击选择文件以及组织进行查询"}
    {/* 暂时展示组织的信息的对应格式哦*/}
    {props.infoShow=='1' && 
      <>
        
        <h3>{props.orgMessage.name}</h3><br/>
        {/*此处还可用的属性为
          <h3>{props.orgMessage.orgId}</h3><br/>
          <h3>{props.orgMessage.parentId}</h3><br/>
          <h3>{props.orgMessage.folderId}</h3><br/>
        */}
        <Tag color="orange">tag1</Tag>
        <Tag color="red">tag</Tag>
        <Tag color="blue">tag</Tag>
        <br/><br/>
          <table >
          <tr>
            <td>所属部门</td>
            <td>35</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>28</td>
          </tr>
        </table> 


        <br/>
        <Button onClick={showModalChange}>修改组织名称</Button>
        <Modal title="组织修改" open={isShowChange} onOk={handleOkChange} onCancel={handleCancelChange}>
        <Input onChange={(e)=>{
          setOrgName(e.target.value)
        }}/>
        </Modal>
        <br/><br/>
        <Button danger onClick={showModalDelete} >删除当前组织</Button>
        <Modal title="删除组织" open={isShowDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}>
        <p>您确定要删除该组织吗</p>
        </Modal>
        <br/><br/>
        <Button onClick={showModalAdd} >添加下级组织</Button>
        <Modal title="新增组织" open={isShowAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
        <Input onChange={(e)=>{
          setNewOrg(e.target.value)
        }}/>
        </Modal>
      </>
    }
    {props.infoShow=='2' && 
    <>
    {/* 具体的信息以及评分 */}
    <h3>{props.fileMessage.name}</h3><br/>
    <Tag color="orange">tag</Tag>
    <Tag color="red">tag</Tag>
    <Tag color="blue">tag</Tag>
    <br/><br/>
    <table >
      <tr>
        <td>文件类型</td>
        <td>{props.fileMessage.type}</td>
      </tr>
      <tr>
        <td>所属部门</td>
        <td>{props.fileMessage.orgId}</td>
      </tr>
      <tr>
        <td>作者</td>
        <td>{props.fileMessage.userId}</td>
      </tr>
    </table>  
    <br></br>
    <Rate disabled defaultValue={4} />
    {/*评论内容*/}
    <div style={{
      backgroundColor:'rgb(229, 229, 229)',
      height:'35%',
      marginTop:20,
      border:'none',
      borderRadius:8,
      padding:10,
      overflowX:'none',
      overflowY:'auto',

    }}>
      {comments.map(item => 
        <div style={{backgroundColor:'white', 
        padding:10,
        border:'none',
        borderRadius:8,
        fontSize:15,
        marginBottom:15

        }}>
          评论信息
        </div>
      )}
    </div>
    {/*评论区*/}
      <div style={{margin:10}}>
        
        <Rate style={{margin:10}} onChange={setStar} value={star}/>
        <TextArea
        style={{margin:10}}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="提交评论"
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        <Button style={{margin:10}} type="primary">提交评论</Button>
      </div>    
    </>
    
    
    }
    
    </div>

  );
}

export default Info;