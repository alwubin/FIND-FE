import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import '../styles/Header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleHeader = () => {
        if (localStorage.getItem('accessToken')) {
            navigate('/mypage');
        } else {
            navigate('/login');
        }
    }

    const handleLogo = () => {
        navigate('/');
    }

    return (
        <div className='headerWrapper'>
            <div className='header'>
                <div className='headerContents'>
                    <div className='logo' style={{cursor:'pointer'}} onClick={handleLogo}>
                        F?ND
                    </div>
                    <div className='spacer'></div>
                    <FaRegUser className='userIcon' onClick={handleHeader} size="28px" color='#0130AB'/>
                </div>
            </div>
        </div>
    )
}

export default Header;