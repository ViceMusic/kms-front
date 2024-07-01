import { Rate,Avatar, Button, Modal} from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useState } from 'react';
import { Input,Table } from 'antd';
const { TextArea } = Input;



//关于表格信息的存储
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];
//表格的具体数据信息
const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
];

function EventTable(data) {
  console.log(data.isModalOpen.open)

  const [isModalOpen,setIsModalOpen]=useState(data.isModalOpen.open)

  
  const handleOk = () => {
    data.isModalOpen.setOpen(false);
  };

  const handleCancel = () => {
    data.isModalOpen.setOpen(false)
  }
  return (
    <Modal title="权限申请/审批" open={data.isModalOpen.open} onOk={handleOk} onCancel={handleCancel}>
    输出点别的
  </Modal>
  )
;
}

export default EventTable;