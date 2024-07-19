import { Rate,Avatar, Button, Modal} from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useEffect, useState } from 'react';
import { Input} from 'antd';
import { Space, Table, Tag } from 'antd';

import axios from 'axios';
import UserName from './UserName';
import KnowName from './knowName';

const { TextArea } = Input;
const { Column, ColumnGroup } = Table;



function Message(data) {
  const [approvals, setApprovals]=useState([])
  const handleOk = () => {
    data.isModalOpen.setOpen(false);
  };

  const handleCancel = () => {
    data.isModalOpen.setOpen(false)
  }
  //审批通过的方法
  const canApproval=(record)=>{
    axios.get('http://localhost:8080/approval/update', {
      params: {
        appId:record.appId,
        status:'1'
      }
    })
    .then(response => {
      alert('审批完成, 刷新页面后显示')
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  }
  //审批不通过的方法
  const canNotApproval=(record)=>{
    axios.get('http://localhost:8080/approval/update', {
      params: {
        appId:record.appId,
        status:'2'
      }
    })
    .then(response => {
      alert('审批完成, 刷新页面后显示')
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  }
  useEffect(()=>{
    axios.get('http://localhost:8080/approval/getByAuthorId', {
      params: {
        authorId:localStorage.getItem('userId')
      }
    })
    .then(response => {//获取该id下面全部的提交的申请
      console.log(response.data.data)
      setApprovals(response.data.data)
    })
  },[])
  return (
    <Modal title="审批列表" open={data.isModalOpen.open} onOk={handleOk} onCancel={handleCancel} width={1040}>
      <Table dataSource={approvals}>
          <Column title="申请编号" dataIndex="appId" key="appId" />
          <Column title="申请用户" dataIndex="userId" key="userId" 
                render={(text) => {
                  return <UserName ID={text}></UserName>
            }}
          />
          <Column title="申请知识" dataIndex="knowId" key="knowId" 
              render={(text) => {
                return <KnowName ID={text}></KnowName>
          }}/>
          <Column title="当前状态" dataIndex="status" key="status" 
            render={(text) => {
                  if(text===0) return <p>尚未审批</p>
                  else if(text===1) return <p>审批通过</p>
                  else if(text===2) return <p>审批不通过</p>
            }}
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => {
              console.log(record)
              return <Space size="middle">
                <a onClick={()=>{
                  canApproval(record)
                }}>审批通过</a>
                <a onClick={()=>{
                  canNotApproval(record)
                }}>审批不通过</a>
                </Space>
            }}/>
        </Table>
    </Modal>
  )
;
}

export default Message;