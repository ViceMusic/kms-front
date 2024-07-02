import { Rate,Avatar, Button, Modal} from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useState } from 'react';
import { Input} from 'antd';
import { Space, Table, Tag } from 'antd';
const { TextArea } = Input;


const { Column, ColumnGroup } = Table;

const datas = [
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

function Message(data) {
  const handleOk = () => {
    data.isModalOpen.setOpen(false);
  };

  const handleCancel = () => {
    data.isModalOpen.setOpen(false)
  }
  return (
    <Modal title="消息列表" open={data.isModalOpen.open} onOk={handleOk} onCancel={handleCancel} width={1400}>
        <Table dataSource={datas}>
            <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
            </ColumnGroup>
            <Column title="Age" dataIndex="age" key="age" />
            <Column title="Address" dataIndex="address" key="address" />
            <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags) => (
                <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                    color = 'volcano';
                    }
                    return (
                    <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                    </Tag>
                    );
                })}
                </>
            )}
            />
            <Column
            title="Action"
            key="action"
            render={(_, record) => (
                <Space size="middle">
                <a>Invite {record.lastName}</a>
                <a>Delete</a>
                </Space>
            )}
            />
        </Table>
    </Modal>
  )
;
}

export default Message;