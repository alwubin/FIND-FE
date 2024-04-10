import React, { useState } from 'react';
import '../styles/Main.css'

const Main = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const messages = [
        { sender: 'me', text: '님아 오늘 뭐먹?' },
        { sender: 'them', text: 'ㄹㅇ 메뉴 고민이 알고리즘 푸는 거보다 더 어려움;' },
        { sender: 'me', text: '[속보] 인류 최대 난제 생겨.. "오늘 뭐 먹지?"' },
    ];

    const foodCategory = ["전체", "한식", "양식", "중식", "일식"];

    const handleCategoryClick = (index) => {
        setActiveIndex(index);
    };

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
                        onClick={() => handleCategoryClick(index)}>
                            {catergory}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Main;