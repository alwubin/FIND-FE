import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Main.css'

const Main = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [listIndex, setListIndex] = useState(0);
    const [storelist, setStoreList] = useState([]);

    const messages = [
        { sender: 'me', text: '님아 오늘 뭐먹?' },
        { sender: 'them', text: 'ㄹㅇ 메뉴 고민이 단국대학교 입학보다 어려움;' },
        { sender: 'me', text: '[속보] 인류 최대 난제 생겨.. "오늘 뭐 먹지?"' },
    ];

    const foodCategory = ["전체", "한식", "중식", "양식", "일식"];

    const handleCategoryClick = (index) => {
        setActiveIndex(index);
        setListIndex(index);

        if (index === 0) {
            getStoreListAll();
        } else {
            getStoreList(index);
        }
    };

    const getStoreListAll = () => {
        axios.get('http://13.51.69.114:8080/api/store/storelistAll')
        .then ((res) => {
            setStoreList(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const getStoreList = (listIndex) => {
        axios.get(`http://13.51.69.114:8080/api/store/storelist/category/${listIndex}`)
        .then ((res) => {
            setStoreList(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getStoreListAll();
    }, [])

    return (
        <div className="mainPage">
            <div className='mainPageContent'>
                <div className='speechBubbleWrap'>
                    {messages.map((message, index) => (
                        <React.Fragment key={index}>
                            <div className={`${message.sender === 'me' ? 'me' : 'from-them'}`}>{message.text}</div>
                            <div className="clear"></div>
                        </React.Fragment>
                    ))}
                </div>
                <div className='foodCatergoryWrap'>
                    {foodCategory.map((catergory, index) => (
                        <div 
                        key={index}
                        className={`category ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => {handleCategoryClick(index)}}>
                            {catergory}
                        </div>
                    ))}
                </div>
                <div className='storeListWrap'>
                    {storelist.map((store, index) => (
                        <div key={index} className='storeList'>
                            <div  className='storeImg'><img src={store.storePictureUrl} alt="storeImg"/></div>
                            <div className='storeName'>{store.storeName}</div>
                            <div className='storeInfo'>{store.info}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Main;