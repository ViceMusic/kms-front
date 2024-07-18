import { useContext, useState } from 'react';
import './ComCss.css'
import Document from './Document';
import Info from './Info';
import Navigation from './Navigation';
import DocumentSearch from './DocumentSearch';
import { AuthContext } from '../AuthProvider';
function Container(props) {
  const [infoShow, setInfoShow]=useState('0') //0代表不展示任何东西, 1代表展示的是一个组织的信息, 2代表是一个文件的具体信息
  const [msg,setMsg]=useState('')             //设置要展示出来的信息
  const [orgId, setOrgId]=useState('') //组织的基本情况
  const [orgMessage, setOrgMessage]=useState({}) //组织的基本情况
  const [fileMessage,setFileMessage]=useState({}) //文件的基本信息
  const [folderMessage,setFolderMessage]=useState({}) //文件夹的基本信息
  const [parentIds, setParentIds]=useState(['0'])
  const [files,setFiles]=useState([])
  const [folders,setFolders]=useState([])
  const [comments, setComments]=useState([])
  const {inSearch, setInSearch, searchs,SetSearchs }=useContext(AuthContext)
  
  return (
    <div className='container'>
      <Navigation 
        setInfoShow={setInfoShow} 
        setMsg={setMsg} 
        setOrgMessage={setOrgMessage} 
        setFileMessage={setFileMessage}
        setParentIds={setParentIds}
        setFolders={setFolders}
        setOrgId={setOrgId}
        setFiles={setFiles}
        setInSearch={props.setInSearch}
        parentIds={parentIds}
        folders={folders}
      />
      {
        !inSearch?
        <Document 
        setInfoShow={setInfoShow} 
        setMsg={setMsg} 
        setOrgMessage={setOrgMessage} 
        setFileMessage={setFileMessage} 
        setParentIds={setParentIds}
        setFolders={setFolders}
        setFiles={setFiles}
        setFolderMessage={setFolderMessage}
        setComments={setComments}
        parentIds={parentIds}
        folders={folders}
        infoShow={infoShow} 
        msg={msg} 
        orgMessage={orgMessage} 
        fileMessage={fileMessage}
        orgId={orgId}
        files={files}
        folderMessage={folderMessage}
      />
        :
      <DocumentSearch 
        setInfoShow={setInfoShow} 
        setMsg={setMsg} 
        setOrgMessage={setOrgMessage} 
        setFileMessage={setFileMessage} 
        setParentIds={setParentIds}
        setFolders={setFolders}
        setFiles={setFiles}
        setFolderMessage={setFolderMessage}
        setComments={setComments}
        parentIds={parentIds}
        folders={folders}
        infoShow={infoShow} 
        msg={msg} 
        orgMessage={orgMessage} 
        fileMessage={fileMessage}
        orgId={orgId}
        files={files}
        folderMessage={folderMessage}
      />
      

      }
      
      <Info 
        infoShow={infoShow} 
        msg={msg} 
        orgMessage={orgMessage} 
        fileMessage={fileMessage}
        folderMessage={folderMessage}
        comments={comments}
      />
    </div>
  );
}

export default  Container;
