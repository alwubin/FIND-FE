import { Routes, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Mypage from '../pages/Mypage';
import Details from '../pages/Details';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<Mypage />} />  
            <Route path="/detail" element={<Details />} />
        </Routes>
    )
}

export default Router;