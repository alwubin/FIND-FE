import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Map, MapMarker } from "react-kakao-maps-sdk";

import { Rating } from "@mui/material";
import ModalFunc from "../pages/ReviewModal";

import "../styles/Details.css";

const Details = () => {
  const [storeInfo, setStoreInfo] = useState([]);
  const [storeReview, setStoreReview] = useState();

  const navigate = useNavigate();

  const getStoreInfo = (storeId) => {
    axios
      .get(`http://16.171.231.94:8080/api/store/storelist/${storeId}`)
      .then((res) => {
        setStoreInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStoreReview = (storeId) => {
    axios
      .get(`http://16.171.231.94:8080/api/store/storelist/${storeId}/reviews`)
      .then((res) => {
        setStoreReview(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getStoreInfo(localStorage.getItem("storeId"));
  }, []);

  useEffect(() => {
    getStoreReview(localStorage.getItem("storeId"));
  }, []);

  const [IsModalOpen, setModalOpen] = useState(false);
  const handleModal = () => {
    setModalOpen(!IsModalOpen);
  };

  return (
    <div className="detailPage">
      <div className="detailPageContent">
        <div className="storeImg">
          <img src={storeInfo.result?.storePictureUrl} alt="이미지 로딩 실패" />
        </div>

        <div className="storeNameNDescription">
          <span className="storeName">{storeInfo.result?.storeName}</span>
          <br />
          <span className="storeDescription">{storeInfo.result?.info}</span>
        </div>

        <div className="storeLocation">
          <span style={{ fontSize: "17px" }}>위치</span>
          <br />
          <span className="storeAddress" style={{ fontSize: "14px" }}>
            {storeInfo.result?.storeAddress}
          </span>
          <hr />
          <div className="storeMap">
            {storeInfo.result?.latitude && (
              <Map
                center={{
                  lat: storeInfo.result?.latitude,
                  lng: storeInfo.result?.longitude,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  margin: 0,
                }}
                zoomable={false}
              >
                <MapMarker
                  position={{
                    lat: storeInfo.result?.latitude,
                    lng: storeInfo.result?.longitude,
                  }}
                ></MapMarker>
              </Map>
            )}
          </div>
          <hr />
          <span className="callNumber">
            TEL: {storeInfo.result?.storePhoneNumber}
          </span>
        </div>

        <div className="storeReviewPart">
          <div
            className="leaveReviewBtn"
            onClick={() => {
              if (!localStorage.getItem("accessToken")) {
                alert("로그인이 필요합니다!");
                navigate("/login");
              } else {
                handleModal();
              }
            }}
          >
            <span>리뷰를 남기고 싶다면? 👆</span>

            <ModalFunc
              isOpen={IsModalOpen}
              onRequestClose={handleModal}
              storeName={storeInfo.result?.storeName}
              storeId={storeInfo.result?.storeId}
            />
          </div>

          <div className="StarRateFromUsers">
            <span className="avergaeStarRate">
              {storeInfo.result?.ratingAverage.toFixed(1)}
            </span>
            <Rating
              readOnly
              size="large"
              precision={0.1}
              value={Number(storeInfo.result?.ratingAverage.toFixed(1))}
              style={{ paddingLeft: "20px" }}
            />
          </div>

          <div className="reviewsFromUsers">
            {storeReview &&
              storeReview.result.map((store, index) => (
                <div key={index} className="review">
                  <span className="userNickname">{store.nickname}</span>
                  <br />
                  <Rating
                    className="starRate"
                    readOnly
                    style={{ padding: "5px" }}
                    value={store.rating}
                  />
                  <br />
                  <span className="userReviewContent">{store.content}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
