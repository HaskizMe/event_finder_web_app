import { Link, Route, Routes } from 'react-router-dom';
import AboutMe from './components/about_me/about_me';
import Home from './components/home/home';
import './App.css';

function App() {
  return (
    <>

      <div className='navbar'>
        <div className='navbar-item'>
            <Link to="/" style={{ color: 'white', }}>Home</Link>
          </div>
          <div className='navbar-item'>
            <Link to="/aboutme" style={{color: 'white',}} >About Me</Link>
        </div>
      </div>
      
      <Routes>
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;