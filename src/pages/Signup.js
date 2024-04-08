import React, { useEffect, useState }from 'react';
import '../styles/Signup.css';

const Signup = () => {
    const [nickname, setNickname] = useState('');
    const [nicknameValid, setNicknameValid] = useState(false);

    const [id, setId] = useState('');
    const [idValid, setIdValid] = useState(false);

    const [pw, setPw] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const [isEmpty, setIsEmpty] = useState(true);

    const handleNickname = (e) => {
        setNickname(e.target.value);
    }

    const handleId = (e) => {
        setId(e.target.value);
    }
    const handlePw = (e) => {
        setPw(e.target.value);
    }

    const handlePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
    }

    useEffect(() => {
        const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,10}$/;
        if (regex.test(nickname)) {
            setNicknameValid(true);
        } else {
            setNicknameValid(false);
        }
    }, [nickname]);

    useEffect(() => {
        const regex = /^[a-z0-9]{5,19}$/g;
        if (regex.test(id)) {
            setIdValid(true);
        } else {
            setIdValid(false);
        }
    }, [id]);

    useEffect(() => {
        const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/;
        if(regex.test(pw)) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }
    }, [pw]);

    useEffect(() => {
        if(pw === passwordCheck) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    }, [pw, passwordCheck]);

    useEffect(() => {
        if (nicknameValid && idValid && passwordMatch && passwordValid) {
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        }
    }, [nicknameValid, idValid, passwordMatch, passwordValid]);

    return (
        <div className='signupPage'>
            <div className='signupPageContent'>
                <div className='signupInputWrap'>
                    Nickname
                    <input 
                        className='signupInput' 
                        type='text'
                        placeholder='닉네임 입력'
                        value={nickname}
                        onChange={handleNickname} />
                </div>
                <div className='signupInputWrap' style={{marginBottom:'0'}}>
                    id
                    <input 
                        className='signupInput' 
                        type='text'
                        placeholder='아이디 입력 (영문, 숫자 포함 6-20자) '
                        value={id}
                        onChange={handleId} />
                </div>
                <button className='checkDuplicateButton'>중복확인</button>
                <div className='signupInputWrap'>
                    pw
                    <input 
                        className='signupInput' 
                        type='password'
                        placeholder='비밀번호 입력 (영문, 숫자, 특수문자 포함 8-20자)'
                        value={pw}
                        onChange={handlePw} />
                </div>
                <div className='signupInputWrap'>
                    Confirm pw
                    <input 
                        className='signupInput' 
                        type='password'
                        placeholder='비밀번호 재입력'
                        value={passwordCheck}
                        onChange={handlePasswordCheck} />
                </div>
                <button className='signupButton' disabled={isEmpty}>Sign up</button>
            </div>
        </div>
    )
}

export default Signup;