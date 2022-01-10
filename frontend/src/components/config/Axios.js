import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_URL_API}:3000`,
    timeout: 10000
})

instance.interceptors.request.use(response => {
    if(
        response.url.includes('post') ||
        response.url.includes('comment') ||
        response.url.includes('profil')
    ) {
        const user = JSON.parse(localStorage.getItem("user"))
        response.headers['Authorization'] = `Bearer ${user.token}`
    }
    return response
})

export default instance