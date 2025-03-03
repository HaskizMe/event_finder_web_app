import { Link, Route, Routes } from 'react-router-dom';
import About from './pages/about/About';
import './App.css';
import LoginForm from './pages/login/Login';
import Login from './auth/Login';
import SignUpForm from './pages/login/Signup';
import Home from './pages/home/Home';
import ForgotPasswordForm from './pages/login/forgotPassword';
import Search from './pages/search/Search';
import EventDetails from './pages/eventDetails/EventDetails';
import MyEvents from './pages/myEvents/MyEvents';
import ProtectedRoute from './auth/ProtectRoute';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '50px', height: '100vh'}}>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you&apos;re looking for does not exist.</p>
      <Link to="/" style={{ color: 'black', textDecoration: 'underline' }}>
        Go Back to Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/login" element={<LoginForm />} /> */}

        {/* <Route element={<AuthRoute/>}/> */}
        <Route path="/login" element={<Login />} />
        <Route path="/my-events" 
            element={
              <ProtectedRoute>
                <MyEvents />
              </ProtectedRoute>
            } 
          />
        <Route path="/search" element={<Search />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </>
  );
}

export default App;