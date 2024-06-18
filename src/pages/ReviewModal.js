import React, { useState } from "react";
import Modal from "react-modal";
import { Rating } from "@mui/material";
import axios from "axios";
import { refreshAccessToken } from "../authUtil";

const ModalStyle = {
  overlay: {
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "fit-content",
    height: "fit-content",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    color: "#0130ab",
    fontFamily: "PretendardVariable",
    border: "2px solid #7ca1ff",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#fffff8",
    textAlign: "center",
  },
};

const ModalFunc = ({ isOpen, onRequestClose, storeName, storeId }) => {
  const [value, setValue] = useState(0);
  // const [reviewText, setReviewTxt] = useState("");

  // 가게 리뷰 작성하기 - 사용자 아이디 사용 필요, 상세페이지에서 액세스 토큰 확인 후 사용자 아이디 가져오기 가능한가???

  const writeStoreReview = () => {
    const today = new Date();
    console.log(
      `store id: ${storeId} \n 
      review txt: ${document.getElementsByClassName("reviewText")[0].value} \n
      rating: ${value} \n
      date: ${today.toJSON()}
      `
    );

    axios
      .post(
        `https://api.foodindankook.com/api/review/create`,
        {
          storeId: storeId,
          rating: value,
          content: document.getElementsByClassName("reviewText")[0].value,
          createDate: today.toJSON(),
          modifiedDate: today.toJSON(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refreshAccessToken()
              .then(() => {
                writeStoreReview();
              })
          } else {
          console.log(err);
          }
      });
  };

  return (
    <div
      className="modalDiv"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={ModalStyle}>
        <div className="closeModalBtn">
          <button onClick={onRequestClose}>X</button>
        </div>
        <span className="storeName">{storeName}</span>
        <hr
          style={{
            height: "2px",
            backgroundColor: "#7ca1ff",
            border: 0,
            margin: "10px 0",
          }}
        ></hr>

        <Rating
          size="large"
          precision={0.5}
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
        ></Rating>

        <br />

        <span>{value}점 줄래요</span>
        <br />
        <textarea
          className="reviewText"
          placeholder="이런 점이 좋았어요"
        ></textarea>
         <br />

        <button
          onClick={() => {
            setValue(0);
            writeStoreReview();
            alert("리뷰를 남겼어요!");
            onRequestClose();
          }}
        >
          SUBMIT
        </button>
      </Modal>
    </div>
  );
};

export default ModalFunc;
