import React from 'react';
import { FaRegUser } from "react-icons/fa6";
import '../styles/Header.css';

const Header = () => {
    return (
        <div className='headerWrapper'>
            <div className='header'>
                <div className='headerContents'>
                    <div className='logo'>
                        F?ND
                    </div>
                    <div className='spacer'></div>
                    <FaRegUser className='userIcon' size="28px" color='#6476fc'/>
                </div>
            </div>
        </div>
    )
}

export default Header;