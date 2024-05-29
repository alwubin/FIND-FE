import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiMiniUserCircle } from "react-icons/hi2";
import { FaChevronRight } from "react-icons/fa6";
import '../styles/Mypage.css';
import { refreshAccessToken } from '../authUtil';


const Mypage = () => {

    const [userId, setUserId] = useState(0);
    const [loginId, setLoginId] = useState('thisisidsample');
    const [nickname, setNickname] = useState('단곰이');
    const [reviews, setReviews] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/';
        alert('로그아웃 되었습니다!')
    }

    const inquireMyPage = () => {
        axios.get(`http://16.171.231.94:8080/api/users/me`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            } 
        })
        .then((res) => {
            const myInfo = res.data.result;
            setNickname(myInfo.nickname);
            setLoginId(myInfo.loginId);
            setReviews(myInfo.reviews);
            setUserId(myInfo.userId);
        })
        .catch((err) => {
            if (err.response.status === 401) {
                refreshAccessToken()
                    .then(() => {
                        inquireMyPage();
                    })
            } else {
                console.log('마이페이지 조회 실패', err);
            }
        })
    }

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            window.location.href = '/';
        } else {
            inquireMyPage();
        }
    }, []);

    return (
        <div className='myPage'>
            <div className='myPageContent'>
                <div className='myPageProfileWrap'>
                    <div className='profileImage'>
                        <HiMiniUserCircle size="64px" color='#6476fc'/>
                    </div>
                    <div className='profileName'>
                        {nickname}
                    </div>
                </div>

                <div className='accountManagementWrap'>
                    <div className='myPageContentTitle'>계정 관리</div>
                    <div className='accountManagementContent'>
                        <div className='accountManagementItem'>
                            <div className='accountIdWrap'>
                                <div className='accountIdTitle'>
                                    아이디
                                </div>
                                <div className='accountId'>
                                    {loginId}
                                </div>
                            </div>
                        </div>
                        <div className='accountManagementItem'>
                            비밀번호 변경
                        </div>
                        <div className='accountManagementItem'>
                            닉네임 변경
                        </div>
                        <div className='accountManagementItem'>
                            프로필 변경
                        </div>
                    </div>
                </div>

                <div className='myPageReviewWrap'>
                    <div className='myPageContentTitle'>리뷰관리</div>
                    <div className='myPageReviewContent'>
                        <div className='myPageReviewItem'>
                            <div className='myPageWrittenReview'>
                                작성한 리뷰
                            </div>
                            <div className='myPageReviewIcon'>
                                <FaChevronRight size="16px" color='#6476fc'/>
                            </div>
                        </div>

                    </div>
                </div>

                {/* <div className='othersWrap'>
                    <div className='myPageContentTitle'>기타</div>
                    <div className='othersContent'>
                        <div className='othersItem'>
                            계정 삭제
                        </div>
                        <div className='othersItem'>
                            로그아웃
                        </div>
                    </div>
                </div> */}
                
                <button className='myPageLogoutButton' onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    )
}

export default Mypage;