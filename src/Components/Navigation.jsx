import './ComCss.css'
import '../styles/space.css'
import { AppstoreOutlined, FolderOutlined , SettingOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

//清理节点的方法
function cleanEmptyChildren(node) {  
  // 如果当前节点有children且children为空数组，则删除children字段  
  if (node.children && node.children.length === 0) {  
      delete node.children;  
  }  
  // 递归地清理每个子节点的children  
  if (node.children) {  
      node.children.forEach(child => {  
          cleanEmptyChildren(child);  
      });  
  }  
}  

//将后端返回的数组进行配置的方法
function buildTree(data) {  
  // 创建一个映射，方便根据parentId查找父节点  
  const map = {};  
  data.forEach(item => {  
      // 创建树节点对象，并设置key和label  
      const treeNode = {  
          key: item.folderId,  
          label: item.name,  
          children: []  
      };  
      // 将此节点添加到映射中，以便后续可以轻松地找到它  
      map[item.orgId] = treeNode;  
  });  

  // 构建树形结构  
  const tree = [];  
  data.forEach(item => {  
      if (item.parentId === 0) {  
          // 顶级节点直接添加到树中  
          tree.push(map[item.orgId]);  
      } else {  
          // 非顶级节点添加到其父节点的children数组中  
          if (!map[item.parentId].children) {  
              // 初始化children数组（尽管这在上面的映射初始化中已经是多余的，因为已经初始化了）  
              map[item.parentId].children = [];  
          }  
          map[item.parentId].children.push(map[item.orgId]);  
      }  
  });  
  
  // 现在，树已经构建完成，我们可以清理空的children字段  
  tree.forEach(node => {  
    cleanEmptyChildren(node);  
  });  

  // 返回清理后的树  
  return tree;  
}  

// 一个预制的数组, 就是新增的一些东西
const items = [
    {
      key: 'sub2',
      label: 'Navigation Two',
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
  ];



function Navigation() {
    const [openFolder,setOpenFolder]=useState('1')
    const [org,setOrg]=useState([])
    //导航栏的点击事件
    const onClick = (e) => {
        console.log('click List', e);
    };
    useEffect(()=>{
      //获取列表并且修整
      axios.get('http://localhost:8080/org/getAll', {
        params: {}
      })
      .then(response => {
        // 处理请求成功的响应
        const folders=response.data.data
        const tree = buildTree(folders);  
        setOrg(tree)
      })
      .catch(error => {
        // 处理请求错误
        console.error(error);
      });
      
    },[])
    //返回组件
    return (
        <div className='Navi radium overflower'>
            <Menu
                    onClick={onClick}
                    style={{
                        width: '100%',
                    }}
                    defaultSelectedKeys={['5']}
                    defaultOpenKeys={['sub2']}
                    mode="inline"
                    items={org}
                />
        </div>
    );
}

export default Navigation;