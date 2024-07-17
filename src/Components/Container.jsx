import { useState } from 'react';
import './ComCss.css'
import Document from './Document';
import Info from './Info';
import Navigation from './Navigation';
function Container() {
  const [infoShow, setInfoShow]=useState('0') //0代表不展示任何东西, 1代表展示的是一个组织的信息, 2代表是一个文件的具体信息
  const [msg,setMsg]=useState('')             //设置要展示出来的信息
  const [orgId, setOrgId]=useState('') //组织的基本情况
  const [orgMessage, setOrgMessage]=useState({}) //组织的基本情况
  const [fileMessage,setFileMessage]=useState({}) //文件的基本信息
  const [parentIds, setParentIds]=useState(['0'])
  const [files,setFiles]=useState([])
  const [folders,setFolders]=useState([])
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
        parentIds={parentIds}
        folders={folders}
      />
      <Document 
        setInfoShow={setInfoShow} 
        setMsg={setMsg} 
        setOrgMessage={setOrgMessage} 
        setFileMessage={setFileMessage} 
        setParentIds={setParentIds}
        setFolders={setFolders}
        setFiles={setFiles}
        parentIds={parentIds}
        folders={folders}
        infoShow={infoShow} 
        msg={msg} 
        orgMessage={orgMessage} 
        fileMessage={fileMessage}
        orgId={orgId}
        files={files}
      />
      <Info 
        infoShow={infoShow} 
        msg={msg} 
        orgMessage={orgMessage} 
        fileMessage={fileMessage}
      />
    </div>
  );
}

export default  Container;
