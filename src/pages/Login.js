import React from 'react';
import '../styles/Login.css';

const Login = () => {
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
                    <button className='loginButton' onClick={() => {alert('로그인 되었습니다!')}}>Login</button>
                    <button className='signupButton' onClick={() => {alert('회원가입 페이지로 이동합니다!')}}>signup</button>
            </div>
        </div>
    )
}

export default Login;