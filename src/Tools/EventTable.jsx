import { Rate,Avatar, Button, Modal, Tag, Space} from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useEffect, useState } from 'react';
import { Input,Table } from 'antd';
import axios from 'axios';
import Column from 'antd/es/table/Column';
import UserName from './UserName';
import KnowName from './knowName';
const { TextArea } = Input;


//展示数据先使用这个
const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];



function EventTable(data) {
  
  const [approvals, setApprovals]=useState([])
  const handleOk = () => {
    data.isModalOpen.setOpen(false);
  };

  const handleCancel = () => {
    data.isModalOpen.setOpen(false)
  }
  const deleteApproval=(appId)=>{
    axios.get('http://localhost:8080/approval/delete', {
      params: {
        appId:appId
      }
    })
    .then(response => {
      console.log(response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });

  }

  useEffect(()=>{
    axios.get('http://localhost:8080/approval/getByUserId', {
      params: {
        userId:localStorage.getItem('userId')
      }
    })
    .then(response => {
      console.log(response.data.data)
      setApprovals(response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  },[])
  return (
    
    <Modal title="我的申请" open={data.isModalOpen.open} onOk={handleOk} onCancel={handleCancel} style={{width:200}}>
      <Table dataSource={approvals}>
          <Column title="申请编号" dataIndex="appId" key="appId" 
          
          />
          <Column title="申请用户" dataIndex="userId" key="userId" 
                render={(text) => {
                  return <UserName ID={text}></UserName>
                 }}/>
          <Column title="申请知识" dataIndex="knowId" key="knowId" 
                render={(text) => {
                  return <KnowName ID={text}></KnowName>
                }}/>
          <Column title="当前状态" dataIndex="status" key="status" 
            render={(text) => {
                  if(text===0) return <p>还未审批</p>
                  else if(text===1) return <p>审批通过</p>
                  else if(text===2) return <p>审批未通过</p>
            }}
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => {
              console.log(record)
              return <Space size="middle">
                <a onClick={()=>{
                  axios.get('http://localhost:8080/approval/delete', {
                    params: {
                      appId:record.appId
                    }
                  })
                  .then(response => {
                    alert('您的申请已经撤销, 请刷新页面后再看')
                  })
                  .catch(error => {
                    // 处理请求错误
                    console.error(error);
                  });
                }}
              
              >移除</a></Space>
            }}/>
        </Table>
    </Modal>
  )
;
}

export default EventTable;