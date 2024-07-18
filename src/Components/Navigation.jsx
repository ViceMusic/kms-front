import './ComCss.css'
import '../styles/space.css'
import { AppstoreOutlined, FolderOutlined , SettingOutlined, FolderOpenOutlined, PlusCircleOutlined,DatabaseOutlined } from '@ant-design/icons';
import { FloatButton, Menu,Modal,Input } from 'antd';
import { useEffect, useState,useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthProvider';

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
  data = data.filter(item => item.orgId !== 0);
  // 创建一个映射，方便根据parentId查找父节点  
  const map = {};  
  data.forEach(item => {  
      // 创建树节点对象，并设置key和label  
      const treeNode = {  
          key: item.orgId,  //还是要想办法获取到id
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




function Navigation(props) {
    const {inSearch, setInSearch, searchs,SetSearchs }=useContext(AuthContext)
    const [openFolder,setOpenFolder]=useState('1')
    const [org,setOrg]=useState([])
    //获取该组织,该文件夹下面所有的文件
    const getAllFilesByOrgIdAndParentId=(orgId, parentId)=>{
      console.log('进入文件夹',parentId)
      axios.get('http://localhost:8080/knowledge/getByFolderIdAndOrgId', {
        params: {orgId:orgId, folderId:parentId}
      })
      .then(response => {
        // 处理请求成功的响应======================================================================
        props.setFiles(response.data.data)
      })
      .catch(error => {
        // 处理请求错误
        console.error(error);
      });
    }
    //获取该组织下面的所有文件夹
    const getAllFolderByOrgIdAndParentId=(orgId, parentId)=>{
      axios.get('http://localhost:8080/folder/getByParentIdAndOrgId', {
        params: {orgId:orgId, parentId:parentId}
      })
      .then(response => {
        // 处理请求成功的响应======================================================================
        console.log('获取文件夹',response.data.data)
        props.setFolders(response.data.data)
      })
      .catch(error => {
        // 处理请求错误
        console.error(error);
      });
    }
    //获取组织的基本信息
    const getMessageOfOrg=(id)=>{
      axios.get('http://localhost:8080/org/getOrgById', {
        params: {orgId:id}
      })
      .then(response => {
        // 处理请求成功的响应
        props.setOrgMessage(response.data.data)
        
        
      })
      .catch(error => {
        // 处理请求错误
        console.error(error);
      });
    }
    //导航栏的点击事件
    const onOpenchange=(e)=>{
        //这里得到的是一个返回的数组
        //数组的最后一个即为最后一个打开的组织的orgid
        //展示组织数据
        props.setInfoShow('1') 
        setInSearch(false)
        // 这里的key就是id,这里一会需要根据key获取组织的基本信息
        if(e.length>=1){
          props.setMsg(e[e.length-1])   //  虽然叫做msg但其实是id
          getMessageOfOrg(e[e.length-1])// 这个后面应该是还需要进一步改进
          getAllFolderByOrgIdAndParentId(e[e.length-1],'0') //获取所有的文件夹信息
          props.setOrgId(e[e.length-1])
          getAllFilesByOrgIdAndParentId(e[e.length-1],'0') //获取所有的文件信息
          props.setParentIds(['0'])
          props.setInFolder(false)
          props.setFolderId('0')
        }
    }
    const onClick = (e) => {
      setInSearch(false)
        //展示组织数据
        props.setInfoShow('1') 
        // 这里的key就是id,这里一会需要根据key获取组织的基本信息
        props.setMsg(e.key)
        //获取id
        getMessageOfOrg(e.key)
        //获取所有的文件夹
        const p=props.parentIds
        getAllFolderByOrgIdAndParentId(e.key,p[p.length-1]) //获取所有文件夹
        getAllFilesByOrgIdAndParentId(e.key,p[p.length-1])//获取所有的文件
        console.log('获取文件',e.key,p[p.length-1])
        props.setOrgId(e.key)
        props.setParentIds(['0'])
        props.setInFolder(false)
        props.setFolderId('0')

    };
    //关于在根目录新增文件的弹窗
    const [newOrg, setNewOrg]= useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      //新增组织(只能在根目录上新增)
      axios.get('http://localhost:8080/org/insert', {
        params: {
          name:newOrg,
          parentId:'0'
        }
      })
      .then(response => {
        console.log(response.data)
        // 处理请求成功的响应
        alert('新增组织成功, 请刷新页面展示')
      })
      .catch(error => {
        // 处理请求错误
        console.error(error);
      });
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    useEffect(()=>{
      //获取列表并且修整
      axios.get('http://localhost:8080/org/getAll', {
        params: {}
      })
      .then(response => {
        // 处理请求成功的响应
        const folders = response.data.data
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
          {/*新增按钮*/}
          <div style={{margin:20, 
            display:'flex',
            justifyContent:'space-between'
          }}>
            <DatabaseOutlined style={{fontSize:30}} onClick={()=>{props.setInfoShow('0')}}/>
            <PlusCircleOutlined style={{fontSize:30}} onClick={showModal}/>
            
          </div>
          {/*滚动菜单*/}
            <Menu
                    onClick={onClick}
                    onOpenChange={onOpenchange}
                    style={{
                        width: '100%',
                    }}
                    mode="inline"
                    items={org}
                />
            <Modal title="在根目录新增组织" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Input onChange={(e)=>{
                setNewOrg(e.target.value)
              }}/>
            </Modal>
          
        </div>
    );
}

export default Navigation;