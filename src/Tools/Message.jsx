import { Rate,Avatar, Button, Modal} from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useEffect, useState } from 'react';
import { Input} from 'antd';
import { Space, Table, Tag } from 'antd';

import axios from 'axios';

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
  const canApproval=(appId)=>{
    axios.get('http://localhost:8080/approval/update', {
      params: {
        appId:appId,
        statue:'1'
      }
    })
    .then(response => {
      console.log('审批通过',response.data.data)
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
    });
  }
  const canNotApproval=(appId)=>{
    axios.get('http://localhost:8080/approval/update', {
      params: {
        appId:appId,
        statue:'2'
      }
    })
    .then(response => {
      console.log('审批不通过',response.data.data)
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
    <Modal title="审批列表" open={data.isModalOpen.open} onOk={handleOk} onCancel={handleCancel} width={1400}>
        <Table dataSource={approvals}>
            <Column title="AppId" dataIndex="appId" key="appId" />
            <Column title="KnowId" dataIndex="knowId" key="knowId" />
            <Column title="Status" dataIndex="status" key="status" />
            <Column title="action" dataIndex="appId" key="appId" 
              render={(appId) => (
                <>
                      <Button onClick={()=>canApproval(appId)}> 同意申请</Button>
                      <Button onClick={()=>canNotApproval(appId)}> 拒绝申请</Button>   
                </>
              )}
            />
            
        </Table>
    </Modal>
  )
;
}

export default Message;