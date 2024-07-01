import './ComCss.css'
import { Rate,Avatar, Button} from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import React, { createElement, useState } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

 const comments=[
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
  {id:'8008008000', name:'张三', comment:'好用的', ratio:3},
]


function Info() {
  const [star, setStar]=useState(0)
  //评论框的内容
  const [value, setValue] = useState('');
  // 关于评论区的一些内容
  return (
    <div className='info radium'> 
    {/* 前面是文件夹的对应格式*/}
    {/*
    <h3>二级部门1</h3><br/>
    <button style={{padding:5}}> 组织文件夹</button><br/><br/>
      <table >
      <tr>
        <td>所属部门</td>
        <td>35</td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>28</td>
      </tr>
    </table>     
      */}

    {/* 前面是文件夹的对应格式(选中具体的文件的时候*/}
    <h3>前端开发规范.pdf</h3><br/>
    {/* 具体的信息以及评分 */}
    <button style={{padding:5}}> 组织文件夹</button><br/><br/>
    <table >
      <tr>
        <td>作者</td>
        <td>ddd</td>
      </tr>
      <tr>
        <td>上传部门</td>
        <td>前端开发部</td>
      </tr>
      <tr>
        <td>上传时间</td>
        <td>2023-4-16</td>
      </tr>
    </table>  
    <br></br>
    <Rate disabled defaultValue={4} />
    {/*评论内容*/}
    <div style={{
      backgroundColor:'rgb(229, 229, 229)',
      height:'35%',
      marginTop:20,
      border:'none',
      borderRadius:8,
      padding:10,
      overflowX:'none',
      overflowY:'auto',

    }}>
      {comments.map(item => 
        <div style={{backgroundColor:'white', 
        padding:10,
        border:'none',
        borderRadius:8,
        fontSize:15,
        marginBottom:15

        }}>
          评论信息
        </div>
      )}
    </div>
    {/*评论区*/}
      <div style={{margin:10}}>
        
        <Rate style={{margin:10}} onChange={setStar} value={star}/>
        <TextArea
        style={{margin:10}}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="提交评论"
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        <Button style={{margin:10}} type="primary">提交评论</Button>
      </div>
    </div>

  );
}

export default Info;