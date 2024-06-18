import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../styles/Signup.css';

const Signup = () => {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState('');
    const [nicknameValid, setNicknameValid] = useState(false);
    const [nicknameMessage, setNicknameMessage] = useState('');

    const [id, setId] = useState('');
    const [idValid, setIdValid] = useState(false);
    const [idCheck, setIdCheck] = useState(false);
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

    const handleIdCheck = () => {
        axios.get(`https://api.foodindankook.com/api/users/check-id?loginId=${id}`,
            { withCredentials: true }
        )
        .then((res) => {
            console.log(res)

        })
        .catch(() => {
            console.log('이미 존대하는 아이디 입니다.')
            setIdCheck(false);
        })
        setIdCheck(true);
        setIdMessage('사용 가능한 아이디입니다!')
    }

    useEffect(() => {
        if (nickname !== '') {
            const nicknameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,10}$/;
            if (nicknameRegex.test(nickname)) {
                setNicknameValid(true);
            } else {
                setNicknameValid(false);
                setNicknameMessage('닉네임은 2-10자의 한글, 영문, 숫자로 구성되어야 합니다.');
            }
        }
    }, [nickname]);

    useEffect(() => {
        if (id !== '') {
            const idRegex = /^[a-z0-9]{5,19}$/g;
            if (idRegex.test(id)) {
                setIdValid(true);
            } else {
                setIdValid(false);
            }
        }
    }, [id]);

    useEffect(() => {
        if (pw !== '' || passwordCheck !== '') {
            const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/;
            if (passwordRegex.test(pw)) {
                setPasswordValid(true);
            } else {
                setPasswordValid(false);
                setPasswordMessage('비밀번호는 8-20자의 대소문자 영문, 숫자, 특수문자로 구성되어야 합니다.');
            }

            if (pw === passwordCheck) {
                setPasswordMatch(true);
            } else {
                setPasswordMatch(false);
            }
        }
    }, [pw, passwordCheck]);

    useEffect(() => {
        if (nicknameValid && idValid && passwordMatch && passwordValid) {
            setIsEmpty(false);
            console.log(nicknameValid)
            console.log(idValid)
            console.log(passwordMatch)
            console.log(passwordValid)
        } else {
            setIsEmpty(true);
        }
    }, [nicknameValid, idValid, passwordMatch, passwordValid]);

    const registerUser = () => {
        axios.post('http://16.171.231.94:8080/api/users/register',
            {
                'loginId': id,
                'password': pw,
                'nickname': nickname
            },
            { withCredentials: true }
        )
        .then((res) => {
            console.log(res);
            alert('회원가입 성공');
            navigate('/login');
        })
        .catch((err) => {
            console.log(err);
            alert('회원가입 실패')
        })
    }


    return (
        <div className='signupPage'>
            <div className='signupPageContent'>
                {!nicknameValid && nickname !== '' && <div className='inputMessage'>{nicknameMessage}</div>}
                <div className='signupInputWrap'>
                    Nickname
                    <input 
                        className='signupInput' 
                        type='text'
                        placeholder='닉네임 입력'
                        value={nickname}
                        onChange={handleNickname} />
                </div>

                {idCheck && <div className='inputMessage' style={{color:'blue'}}>{idMessage}</div>}
                <div className='signupInputWrap' style={{marginBottom:'0'}}>
                    id
                    <input 
                        className='signupInput' 
                        type='text'
                        placeholder='아이디 입력 (영문, 숫자 포함 5-19자) '
                        value={id}
                        onChange={handleId} />
                </div>
                <button className='checkDuplicateButton' onClick={handleIdCheck}>중복확인</button>

                {!passwordValid && (pw !== '' || passwordCheck !== '') && <div className='inputMessage'>{passwordMessage}</div>}
                <div className='signupInputWrap'>
                    pw
                    <input 
                        className='signupInput' 
                        type='password'
                        placeholder='비밀번호 입력 (영문, 숫자, 특수문자 포함 8-20자)'
                        value={pw}
                        onChange={handlePw} />
                </div>

                {!passwordMatch && (pw !== '' || passwordCheck !== '') && <div className='inputMessage'>비밀번호가 일치하지 않습니다.</div>}
                <div className='signupInputWrap'>
                    Confirm pw
                    <input 
                        className='signupInput' 
                        type='password'
                        placeholder='비밀번호 재입력'
                        value={passwordCheck}
                        onChange={handlePasswordCheck} />
                </div>
                <button className='signupButton' disabled={isEmpty} onClick={registerUser}>Sign up</button>
            </div>
        </div>
    )
}

export default Signup;