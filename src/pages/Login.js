import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        alert('로그인 되었습니다!');
    }

    const handleSignUp = () => {
        alert('회원가입 페이지로 이동합니다!');
        navigate('/signup');
    }
    return (
        <div className="loginPage">
            <div className='loginPageContent'>
                <div className='loginInputWarp'>
                    id
                    <input className="loginInput" type="text"/>
                </div>
                <div className='loginInputWarp'>
                    pw
                    <input className="loginInput" type="password"/>
                </div>
                    <button className='loginButton' onClick={handleLogin}>Login</button>
                    <button className='moveToSignupButton' onClick={handleSignUp}>signup</button>
            </div>
        </div>
    )
}

export default Login;