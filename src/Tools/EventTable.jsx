import { Rate,Avatar, Button, Modal} from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useState } from 'react';
import { Input,Table } from 'antd';
const { TextArea } = Input;

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
const datas = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: <div>内部消息暂时不对外开放, 时间轴按照区域进行获取2</div>,
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: <div>内部消息暂时不对外开放</div>,
  },
  {
    key: 3,
    name: 'Star light',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: <div>内部消息暂时不对外开放</div>,
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    description: <div>内部消息暂时不对外开放</div>,
  },
];



function EventTable(data) {
  const handleOk = () => {
    data.isModalOpen.setOpen(false);
  };

  const handleCancel = () => {
    data.isModalOpen.setOpen(false)
  }
  return (
    <Modal title="权限申请/审批" open={data.isModalOpen.open} onOk={handleOk} onCancel={handleCancel} style={{width:200}}>
     <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => {
            console.log(data)
              return (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {record.description}
                </p>
              )
          },
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={datas}
      />
    </Modal>
  )
;
}

export default EventTable;