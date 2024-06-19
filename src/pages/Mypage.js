import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiMiniUserCircle } from "react-icons/hi2";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import "../styles/Mypage.css";
import { refreshAccessToken } from "../authUtil";
import { Rating } from "@mui/material";

const Mypage = () => {
  const [userId, setUserId] = useState(0);
  const [loginId, setLoginId] = useState("thisisidsample");
  const [nickname, setNickname] = useState("단곰이");

  // -------------jy 수정---------------

  // review state
  const [userReviews, setReviews] = useState({});
  // 리뷰 토글 리스트 state
  const [isRevOpen, setRevOpen] = useState(false);
  // 리뷰 토글 리스트 handle function
  const handleToggle = () => {
    setRevOpen(!isRevOpen);
  };

  // -------------jy 수정---------------

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
    alert("로그아웃 되었습니다!");
  };

  const inquireMyPage = () => {
    axios
      .get(`https://api.foodindankook.com/api/users/me`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
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
          refreshAccessToken().then(() => {
            inquireMyPage();
          });
        } else {
          console.log("마이페이지 조회 실패", err);
        }
      });
  };

  // -------------jy 수정---------------

  // 마이페이지 리뷰 조회 코드
  const getMyReview = () => {
    axios
      .get(`https://api.foodindankook.com/api/users/me/reviews`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setReviews(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refreshAccessToken().then(() => {
            getMyReview();
          });
        } else {
          console.log(err);
        }
      });
  };

  // -------------jy 수정---------------

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      window.location.href = "/";
    } else {
      inquireMyPage();
    }
  }, []);

  // -------------jy 수정---------------

  // review 불러오기
  useEffect(() => {
    getMyReview();
  }, {});

  // -------------jy 수정---------------

  return (
    <div className="myPage">
      <div className="myPageContent">
        <div className="myPageProfileWrap">
          <div className="profileImage">
            <HiMiniUserCircle size="64px" color="#6476fc" />
          </div>
          <div className="profileName">{nickname}</div>
        </div>

        <div className="accountManagementWrap">
          <div className="myPageContentTitle">계정 관리</div>
          <div className="accountManagementContent">
            <div className="accountManagementItem">
              <div className="accountIdWrap">
                <div className="accountIdTitle">아이디</div>
                <div className="accountId">{loginId}</div>
              </div>
            </div>
            <div className="accountManagementItem" style={{color:'#d3d3d3'}}>비밀번호 변경</div>
            <div className="accountManagementItem" style={{color:'#d3d3d3'}}>닉네임 변경</div>
            <div className="accountManagementItem" style={{color:'#d3d3d3'}}>프로필 변경</div>
          </div>
        </div>

        <div className="myPageReviewWrap">
          <div className="myPageContentTitle">리뷰관리</div>
          <div className="myPageReviewContent">
            <div className="myPageReviewItem">
              <div className="myPageWrittenReview">작성한 리뷰</div>

              {/* -----------jy 수정 ------------- */}

              {/* 마이페이지 리뷰 토글 작성 */}
              <div className="myPageReviewIcon" onClick={handleToggle}>
                {isRevOpen ? (
                  <FaChevronDown
                    size="16px"
                    color="#6476fc"
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <FaChevronRight
                    size="16px"
                    color="#6476fc"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>

              {/* -----------jy 수정 ------------- */}

      
            </div>
          </div>
        </div>

        {/* -----------jy 수정 ------------- */}

        {/* 마이페이지 리뷰 조회 부분 */}
        {userReviews &&
          userReviews.result?.reviews.map((review, index) => (
            <div
              key={index}
              className="userReview"
              style={{
                display: isRevOpen ? "block" : "none",
              }}
            >
              <span className="storeNameOnRev">{review.storeName}</span>
              <hr style={{ margin: "3px" }} />
              <Rating
                className="starRate"
                readOnly
                size="small"
                // style={{ padding: "5px" }}
                value={review.rating}
              />
              <br />
              <span className="reviewContent">{review.content}</span>
            </div>
          ))}

        {/* -----------jy 수정 ------------- */}

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

        <button className="myPageLogoutButton" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Mypage;
