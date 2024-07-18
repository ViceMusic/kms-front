import { Rate,Avatar, Button, Modal} from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useEffect, useState } from 'react';
import { Input,Table } from 'antd';
import axios from 'axios';
const { TextArea } = Input;






function EventTable(data) {
  const columns = [
    {
      title: 'AppId',
      dataIndex: 'appId',
      key: 'appId',
    },
    {
      title: 'KnowId',
      dataIndex: 'knowId',
      key: 'knowId',
    },
    {
      title: 'userId',
      dataIndex: 'appId',
      key: 'appId',
      render: (appId) => <Button onClick={()=>deleteApproval(appId)}>删除申请</Button>,
    },
  ];
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
     <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => { //这里说的是每一条记录
            console.log(data)
              return (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {record.statu==0?"还没有审批":'审批结束哩'}
                </p>
              )
          },
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={approvals}
      />
    </Modal>
  )
;
}

export default EventTable;