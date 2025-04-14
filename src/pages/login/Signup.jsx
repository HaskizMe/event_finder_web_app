import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useState, useEffect, useContext } from 'react';
import { MdArrowBack } from 'react-icons/md';
import colors from '../../theme/colors';
import { API_BASE_URL } from "../../config";


const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const createAccount = async (userData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/signup/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.detail || "Signup failed");
          setIsSuccess(false);
          return;
        }
    
        const data = await response.json();
    
        setError("User created!");
        setIsSuccess(true);
      } catch (err) {
        setError("Signup failed: " + err.message);
        setIsSuccess(false);
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      if(!email || !password){
          alert('Please enter email and password');
          setError('Please enter email and password');
          setIsSuccess(false);
      } else if(!username){
          alert('Please enter a username');
          setError('Please enter a username');
          setIsSuccess(false);
      } else if(password !== confirmPassword){
          alert('Passwords do not match');
          setError('Passwords do not match');
          setIsSuccess(false);
      } else {
          const userData = {
            email: email.toLowerCase().trim(),
            username: username.trim(),
            password
          };
          await createAccount(userData);
          setEmail('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');
      }
      
  }


  return (
    <MainLayout>
      <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "flex-start",
          marginTop: "50px", 
          marginBottom: "50px", 
          height: "70vh"
      }}>
          <div className='card shadow-lg col-sm-6 col-md-3 p-4' 
              style={{ maxHeight: "700px", overflow: "auto" }}
          >
              <h3 className="text-center mb-4">Create Account</h3>
              {error && (
                <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                      <label className='form-label'>Email Address</label>
                      <input
                          type='email'
                          className='form-control'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='Enter email'
                      />
                  </div>
                  <div className='mb-3'>
                      <label className='form-label'>Username</label>
                      <input
                          type='text'
                          className='form-control'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder='Enter username'
                      />
                  </div>
                  <div className='mb-3'>
                      <label className='form-label'>Password</label>
                      <input
                          type='password'
                          className='form-control'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder='Enter password'
                      />
                  </div>
                  <div className='mb-3'>
                      <label className='form-label'>Confirm Password</label>
                      <input
                          type='password'
                          className='form-control'
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder='Confirm password'
                      />
                  </div>
                  <button type='submit' className='btn' style={{backgroundColor: colors.red, color: colors.white}}>Sign Up</button>
              </form>
          </div>
      </div>
    </MainLayout>
  );
};

export default SignUpForm;