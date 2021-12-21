import axios from 'axios';

function AxiosToken(){

    if (localStorage.getItem('user') == null) {
        return false
    }
    else {
        const local = JSON.parse(localStorage.getItem('user'))
        const userToken = local.token
        return userToken
    }

    
}
/*
export default {

    const token = AxiosToken(),
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.token}`,
    axios.defaults.timeout = 6000
}
*/


