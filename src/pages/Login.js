import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const handleLogin = () => {
        axios.post('https://api.foodindankook.com/api/users/login',
            {
                "loginId": id,
                "password": pw
            }
        )
        .then((res) => {
            console.log(res);
            alert('로그인 성공');
            localStorage.setItem('accessToken', res.data.result.accessToken);
            localStorage.setItem('refreshToken', res.data.result.refreshToken);
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
            alert('로그인 실패');
        })
    }

    const handleSignUp = () => {
        alert('회원가입 페이지로 이동합니다!');
        navigate('/signup');
    }

    const handleId = (e) => {
        setId(e.target.value);
    }

    const handlePw = (e) => {
        setPw(e.target.value);
    }



    return (
        <div className="loginPage">
            <div className='loginPageContent'>
                <div className='loginInputWarp'>
                    id
                    <input 
                        className="loginInput" 
                        type="text"
                        value={id}
                        onChange={handleId}/>
                </div>
                <div className='loginInputWarp'>
                    pw
                    <input 
                        className="pwInput" 
                        type="password"
                        value={pw}
                        onChange={handlePw}/>
                </div>
                    <button className='loginButton' onClick={handleLogin}>Login</button>
                    <button className='moveToSignupButton' onClick={handleSignUp}>signup</button>
            </div>
        </div>
    )
}

export default Login;