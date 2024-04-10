import React, { useEffect, useState }from 'react';
import '../styles/Signup.css';

const Signup = () => {
    const [nickname, setNickname] = useState('');
    const [nicknameValid, setNicknameValid] = useState(false);
    const [nicknameMessage, setNicknameMessage] = useState('');

    const [id, setId] = useState('');
    const [idValid, setIdValid] = useState(false);
    const [idCheck, setIdCheck] = useState(true);
    const [idMessage, setIdMessage] = useState('');

    const [pw, setPw] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');

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

    const handleIdCheck = (id) => {
        //아이디 중복확인 api 로직 
        setIdCheck(true);
        setIdMessage('사용 가능한 아이디입니다.');

        // if (idCheck) {
        //     setIdMessage('사용 가능한 아이디입니다.');
        // } else {
        //     setIdMessage('이미 사용중인 아이디입니다.');
        // }
    }

    useEffect(() => {
        const nicknameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,10}$/;
        if (nicknameRegex.test(nickname)) {
            setNicknameValid(true);
            setNicknameMessage('');
        } else {
            setNicknameValid(false);
            setNicknameMessage('닉네임은 2-10자의 한글, 영문, 숫자로 구성되어야 합니다.');
        }
    }, [nickname]);

    useEffect(() => {
        const idRegex = /^[a-z0-9]{5,19}$/g;
        if (idRegex.test(id)) {
            setIdValid(true);
        } else {
            setIdValid(false);
        }
    }, [id]);

    useEffect(() => {
        const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/;
        if(passwordRegex.test(pw)) {
            setPasswordValid(true);
            setPasswordMessage('');
        } else {
            setPasswordValid(false);
            setPasswordMessage('비밀번호는 8-20자의 영문, 숫자, 특수문자로 구성되어야 합니다.');
        }

        if (pw === passwordCheck) {
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
                <div className='inputMessageWrap'>
                    {!nicknameValid && <div className='inputMessage'>{nicknameMessage}</div>}
                </div>
                <div className='signupInputWrap'>
                    Nickname
                    <input 
                        className='signupInput' 
                        type='text'
                        placeholder='닉네임 입력'
                        value={nickname}
                        onChange={handleNickname} />
                </div>

                {idCheck ? 
                    <div className='inputMessage'>사용 가능한 아이디입니다.</div> 
                    : <div className='inputMessage'>이미 사용중인 아이디입니다.</div>}
                <div className='signupInputWrap' style={{marginBottom:'0'}}>
                    id
                    <input 
                        className='signupInput' 
                        type='text'
                        placeholder='아이디 입력 (영문, 숫자 포함 6-20자) '
                        value={id}
                        onChange={handleId} />
                </div>
                <button className='checkDuplicateButton' onClick={handleIdCheck}>중복확인</button>

                {!passwordValid && <div className='inputMessage'>{passwordMessage}</div>}
                <div className='signupInputWrap'>
                    pw
                    <input 
                        className='signupInput' 
                        type='password'
                        placeholder='비밀번호 입력 (영문, 숫자, 특수문자 포함 8-20자)'
                        value={pw}
                        onChange={handlePw} />
                </div>

                {!passwordMatch && <div className='inputMessage'>비밀번호가 일치하지 않습니다.</div>}
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