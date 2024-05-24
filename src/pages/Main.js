import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Main.css'
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const [listIndex, setListIndex] = useState(0);
    const [storelist, setStoreList] = useState([]);
    const [storeId, setStoreId] = useState(0);

    const messages = [
        { sender: 'me', text: '님아 오늘 뭐먹?' },
        { sender: 'them', text: '무슨 메뉴 고민이 단국대학교 입학보다 어렵냐;' },
        { sender: 'me', text: '그럴 줄 알고 내가 준비했지 밑에서 골라봐 ㅋ' },
    ];

    const foodCategory = ["전체", "한식", "중식", "양식", "일식"];

    const handleCategoryClick = (index) => {
        setActiveIndex(index);
        setListIndex(index);
        getStoreList(index);
    };

    const getStoreList = (listIndex) => {
        axios.get(`http://16.171.231.94:8080/api/store/storelist/category/${listIndex}`)
        .then ((res) => {
            setStoreList(res.data.result);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const moveToDetail = (store) => {
        const storeId = store.storeId;
        setStoreId(storeId);

        //localStorage -> localStorage.getItem(storeId) & useLocation -> location.state.storeId로 받아올 수 있음
        localStorage.setItem('storeId', storeId);
        navigate('/detail', { state: { storeId } });
    }

    useEffect(() => {
        getStoreList(listIndex);
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
                        <div key={index} className='storeList' onClick={() => {moveToDetail(store)}}>
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