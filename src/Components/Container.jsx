import './ComCss.css'
import Document from './Document';
import Info from './Info';
import Navigation from './Navigation';
function Container() {
  return (
    <div className='container'>
      <Navigation/>
      <Document/>
      <Info/>
    </div>
  );
}

export default  Container;
