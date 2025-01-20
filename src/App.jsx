import { Link, Route, Routes } from 'react-router-dom';
import About from './components/about/about';
import Home from './components/home/home';
import './App.css';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you're looking for does not exist.</p>
      <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>
        Go Back to Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <>
      <div className='navbar'>

        {/* title */}
        <h1 style={{color: 'black'}}>AroundU</h1>

        <div className='nav-bar-navigation-box'>

          {/* Home Button */}
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <div className="navbar-item">Home</div>
          </Link>

          {/* About Us Button */}
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
            <div className="navbar-item">About Us</div>
          </Link>

        </div>
      </div>
      
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;