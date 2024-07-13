import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import Container from './Components/Container';
import Tail from './Components/Tail';
import Home from './Pages/Home';
import User from './Pages/User';
import { AuthProvider } from './AuthProvider';
import { AuthContext } from './AuthProvider'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Protector from './Protector';
import Sign from './Pages/Sign';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<User/>} />
          <Route path='/Sign' element={<Sign/>} />
          <Route path='/' element={<Protector Component={()=><Home/>}/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
// 有两个东西是没用的