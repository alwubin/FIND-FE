import axios from 'axios';

export const refreshAccessToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    return axios
        .post('http://54.180.9.206:8080/api/users/refresh-token',
        { refreshToken: refreshToken }, 
        { withCredentials: true })
        .then((res) => {
            const { accessToken, refreshToken } = res.data.result;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        })
        .catch((err) => {
            console.error('토큰 갱신 실패:', err);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/';
            alert('로그아웃 되었습니다.');
        });
}