import './ComCss.css'
function Info() {
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
    {/*这里包括一些下载什么的内容*/}
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
    </div>

  );
}

export default Info;