import React, { useEffect, useState } from 'react';
import { HiMiniUserCircle } from "react-icons/hi2";
import { FaChevronRight } from "react-icons/fa6";
import '../styles/Mypage.css';

const Mypage = () => {
    return (
        <div className='myPage'>
            <div className='myPageContent'>
                <div className='myPageProfileWrap'>
                    <div className='profileImage'>
                        <HiMiniUserCircle size="64px" color='#6476fc'/>
                    </div>
                    <div className='profileName'>
                        단곰이
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
                                    thisisidsample
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
                
                <button className='myPageLogoutButton'>로그아웃</button>
            </div>
        </div>
    )
}

export default Mypage;