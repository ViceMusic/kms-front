import { Rate,Avatar, Button, Modal} from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useEffect, useState } from 'react';
import { Input} from 'antd';
import { Space, Table, Tag } from 'antd';

import axios from 'axios';

const { TextArea } = Input;
const { Column, ColumnGroup } = Table;



function KnowName(data) {
  const [name,setName]=useState('')
  useEffect(()=>{
    axios.get('http://localhost:8080/knowledge/getByKnowId', {
        params: {
          knowId:data.ID
        }
      })
      .then(response => {
        console.log(response.data)
        setName(response.data.data.name)
      })
      .catch(error => {
        // 处理请求错误
        console.error(error);
      });
  },[])
  return (
    <>
    {name}
    </>
  )
;
}

export default KnowName;