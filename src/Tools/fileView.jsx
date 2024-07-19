import { Rate,Avatar, Button, Modal} from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useEffect, useState } from 'react';
import { Input} from 'antd';
import { Space, Table, Tag } from 'antd';
import FileViewer from 'react-file-viewer';
import FileDisplay from './FileDisplay';
const { TextArea } = Input;



function FileView(data) {//fileMsg
  
    //关闭页面情况
    const handleOk = () => {
        data.isModalOpen.setOpen(false);
      };
    
      const handleCancel = () => {
        data.isModalOpen.setOpen(false)
      }
    useEffect(()=>{
      
    },[])
  return (
    //文件
    <Modal title={'文件预览'} open={data.isModalOpen.open} onOk={handleOk} onCancel={handleCancel} width={1400}>
      {data.fileMsg.type=='pdf'||data.fileMsg.type=='png'||data.fileMsg.type=='jpg'?
        <iframe style={{height:600,width:'100%'}} src={"/"+data.fileMsg.url}></iframe>
      :
       '您所访问的文件格式暂时不支持预览, 您可以将文件下载以后再进行浏览'
    }
       
    </Modal>
  )
;
}

export default FileView;

/*
<FileViewer 
        fileType='pdf'//文件类型
        filePath={require(file)} //文件地址（后台给返的二进制流也可以）
       /> 
*/