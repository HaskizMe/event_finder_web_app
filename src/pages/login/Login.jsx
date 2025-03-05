/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import colors from '../../theme/colors';

function login() {
    const {login, user} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //const [isLoggedIn, login] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            // Need to add an admin page or a page that only logged in users can access
            console.log('User logged in');
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password){
            //alert('Please enter email and password');
            //setError('Please enter email and password');
        } 

        const userData = { email };
        login(userData); // Updates AuthContext

        console.log('User logged in:', email);
        navigate('/about'); // Redirect after login
        
    }

    return (
        <MainLayout title='Login | MyPage'>
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "flex-start",
                marginTop: "50px", 
                marginBottom: "50px", 
                height: "70vh"
            }}>
                <div className='card shadow-lg col-sm-6 col-md-3 p-4' 
                    style={{ maxHeight: "500px", overflow: "auto" }}
                >
                    <h3 className="text-center mb-4">Login</h3>
                    {error && <div className='alert alert-danger'>{error}</div>}
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
                            <label className='form-label'>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter password'
                            />
                        </div>
                        <button type='submit' className='btn' style={{backgroundColor: colors.red, color: colors.white}}>Login</button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default login;