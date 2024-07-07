import '../App.css';
import Header from '../Components/Header';
import Container from '../Components/Container';
import Tail from '../Components/Tail';
import { AuthContext } from '../AuthProvider'; //在子组件中引入整个东西
import { useContext } from 'react';

function Home() {
    const { isLoggedIn,login, logout  } = useContext(AuthContext); 
  return (
    <div > 
      <Header/>
      <Container/>
      <Tail/>
    </div>
  );
}

export default Home;
