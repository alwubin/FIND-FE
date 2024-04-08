import React from 'react';
import '../styles/Signup.css';

const Signup = () => {
    return (
        <div className='registerPage'>
            <div className='registerPageContent'>
                <div className='registerInputWrap'>
                    Nickname
                    <input className='registerInput' type='text'/>
                </div>
                <div className='registerInputWrap'>
                    id
                    <input className='registerInput' type='text'/>
                </div>
                <button className='checkDuplicateButton'>중복확인</button>
                <div className='registerInputWrap'>
                    pw
                    <input className='registerInput' type='password'/>
                </div>
                <div className='registerInputWrap'>
                    Confirm pw
                    <input className='registerInput' type='password'/>
                </div>
                <button className='registerButton'>Sign up</button>
            </div>
        </div>
    )
}

export default Signup;