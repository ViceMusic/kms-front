import './ComCss.css'
import '../styles/space.css'
import { AppstoreOutlined, FolderOutlined , SettingOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';


// 一个预制的数组
const items = [
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <FolderOutlined />,
      children: [
        {
          key: 'g1',
          label: 'Item 1',
          type: 'group',
          children: [
            {
              key: '1',
              label: 'Option 1',
            },
            {
              key: '2',
              label: 'Option 2',
            },
          ],
        },
        {
          key: 'g2',
          label: 'Item 2',
          type: 'group',
          children: [
            {
              key: '3',
              label: 'Option 3',
            },
            {
              key: '4',
              label: 'Option 4',
            },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <FolderOpenOutlined />,
      children: [
        {
          key: '5',
          label: 'Option 5',
        },
        {
          key: '6',
          label: 'Option 6',
        },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            {
              key: '7',
              label: 'Option 7',
            },
            {
              key: '8',
              label: 'Option 8',
            },
          ],
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <FolderOpenOutlined />,
      children: [
        {
          key: '9',
          label: 'Option 9',
        },
        {
          key: '10',
          label: 'Option 10',
        },
        {
          key: '11',
          label: 'Option 11',
        },
        {
          key: '12',
          label: 'Option 12',
        },
      ],
    },
    {
      key: 'grp',
      label: 'Group',
      type: 'group',
      children: [
        {
          key: '13',
          label: 'Option 13',
        },
        {
          key: '14',
          label: 'Option 14',
        },
      ],
    },
  ];



function Navigation() {
    const [openFolder,setOpenFolder]=useState('1')
    //导航栏的点击事件
    const onClick = (e) => {
        console.log('click List', e);
    };
    //返回组件
    return (
        <div className='Navi radium overflower'>
            <Menu
                    onClick={onClick}
                    style={{
                        width: 256,
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
        </div>
    );
}

export default Navigation;