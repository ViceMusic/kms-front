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
  const [averageStar, setAverageStar]=useState(0)
  const [inFolder, setInFolder]=useState(false)//是否在文件夹中(用来展示回退按键的)
  const [folderId, setFolderId]=useState('0')
  
  
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
        setInFolder={setInFolder}
        inFolder={inFolder}
        folderId={folderId}
        setFolderId={setFolderId}
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
        setAverageStar={setAverageStar}
        parentIds={parentIds}
        folders={folders}
        infoShow={infoShow} 
        msg={msg} 
        orgMessage={orgMessage} 
        fileMessage={fileMessage}
        orgId={orgId}
        files={files}
        folderMessage={folderMessage}
        setInFolder={setInFolder}
        inFolder={inFolder}
        folderId={folderId}
        setFolderId={setFolderId}
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
        setAverageStar={setAverageStar}
        parentIds={parentIds}
        folders={folders}
        infoShow={infoShow} 
        msg={msg} 
        orgMessage={orgMessage} 
        fileMessage={fileMessage}
        orgId={orgId}
        files={files}
        folderMessage={folderMessage}
        averageStar={averageStar}
        folderId={folderId}
        setFolderId={setFolderId}
      />
      

      }
      
      <Info 
        infoShow={infoShow} 
        msg={msg} 
        orgMessage={orgMessage} 
        fileMessage={fileMessage}
        folderMessage={folderMessage}
        comments={comments}
        averageStar={averageStar}
      />
    </div>
  );
}

export default  Container;
