import './Like.css';
import axios from 'axios';


function Like({ post_id, like }) {



    function handleLike(post_id) {

        const user = JSON.parse(localStorage.getItem('user'));

        axios.post(process.env.REACT_APP_URL_API + ':3000/api/like/' + post_id, "", { headers: { "Authorization": `Bearer ${user.token}` } })
            .then((res) => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

        console.log(like)

    return (
        <div>
            <div className="layout-like">
                {
                    like === null ?
                        <button onClick={() => handleLike(post_id)}><i className='bx bx-like' ></i></button>
                        :
                        <button onClick={() => handleLike(post_id)}><i className='bx bxs-like' ></i></button>
                }
            </div>
        </div>
    )
}

export default Like