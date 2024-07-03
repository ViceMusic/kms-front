import { Rate,Avatar, Button, Modal} from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useState } from 'react';
import { Input} from 'antd';
import { Space, Table, Tag } from 'antd';
import FileViewer from 'react-file-viewer';
const { TextArea } = Input;



function FileView(data) {
    //关闭页面情况
    const handleOk = () => {
        data.isModalOpen.setOpen(false);
      };
    
      const handleCancel = () => {
        data.isModalOpen.setOpen(false)
      }
  return (
    //文件
    <Modal title={'文件预览'+data.fileurl} open={data.isModalOpen.open} onOk={handleOk} onCancel={handleCancel} width={1400}>
       <FileViewer 
        fileType='docx'//文件类型
        filePath={require('C:/Users/98175/Desktop/work/kms-front/src/周易论文.docx')} //文件地址（后台给返的二进制流也可以）
       /> 
    </Modal>
  )
;
}

export default FileView;