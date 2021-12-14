import axios from "axios"

const token = localStorage.getItem('token')

function Axios() {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:3000/api/',
        headers: {
            'access-control-allow-origin': '*',
            'Authorization': `Bearer ${token}`,

        }
    })
}

export default Axios;