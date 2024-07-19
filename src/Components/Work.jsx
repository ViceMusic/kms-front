import { useContext, useState } from 'react';
import './ComCss.css'
import Document from './Document';
import Info from './Info';
import Navigation from './Navigation';
import DocumentSearch from './DocumentSearch';
import { AuthContext } from '../AuthProvider';
import DocumentCollect from './DocumentCollect';

//个人工作台的界面
function Work(props) {
  
  
  
  return (
    <div className='container'>
      <DocumentCollect />
      <Info />
    </div>
  );
}

export default  Container;
