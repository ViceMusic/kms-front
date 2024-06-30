import { Grid } from '@material-ui/core';
import './ComCss.css'
import { Breadcrumb ,Cascader,DatePicker} from 'antd';
import Search from 'antd/es/input/Search';

const options = [
  { 
  value: 'zhejiang',
  label: 'Zhejiang',
    },]

const files=[
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
  {name:'file', type:1},
  {name:'folder', type:2},
  {name:'text', type:3},
]

function Document() {
  //关于选择框
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <div className='docu radium'>

      {/* 检测文件列表数目*/}
      <h1 style={{marginBottom:20}}>文件列表(9)</h1>

      {/*面包屑导航*/}
      <Breadcrumb
        items={[
          {title: 'Home',},
          {title: <a href="">Application Center</a>,},
          {title: <a href="">Application List</a>,},
          {title: 'An Application',},
        ]}
        />

      {/*下拉框子*/}
      <div style={{display:'flex', justifyContent:'space-between'}}>
        {/*关于日期*/}
        <div>
          <Cascader style={{margin:10,width:150}} options={options} onChange={onChange} placeholder="Please select" />
          <Cascader style={{margin:10,width:150}} options={options} onChange={(value)=> console.log(value)} placeholder="Please select" />
          <DatePicker  style={{width:200}} onChange={(date, dateString) => { console.log(date, dateString);}} needConfirm />
        </div>
        {/*关于搜索框*/}
        <Search placeholder="input search text" style={{width:400}} className='div-center' onSearch={(value)=>{console.log("")}} enterButton  /> 
        {/*一些关于文件夹和乱七八糟的东西(具体的文件内容)*/}
      </div>

      {/*文件的块状转化模式*/}
      <div style={{height:'80%',overflowY:'auto',overflowX:'hidden'}}>
        <Grid container spacing={2}>
          {
          files.map((item)=><Grid xs={2}>
              <div className='file-blocks'>
                <div  style={{backgroundColor:'grey', height:100, width:100}}></div>
                {item.name}
               
              </div>
          </Grid>)
        }
        </Grid>


      </div>

    </div>
  );
}

export default  Document;