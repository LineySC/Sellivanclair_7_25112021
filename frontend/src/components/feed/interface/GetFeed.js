import './../../../styles/Post.css';
import Comment from './../comment/Comment';
import Like from './../comment/Like';

import axios from 'axios';
import { useState, useEffect } from 'react'



function GetFeed({priv, post_id, avatar, firstName, lastName, cover, message, date, userId }) {

    const [auth, setAuth] = useState(false)
    //Supression de Post
    function HandleClick(post_id) {

        const user = JSON.parse(localStorage.getItem('user'));
        axios.delete(`http://192.168.1.64:3000/api/post/${post_id}`, { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => console.log(res))
            .catch(console.log('No delete'))

        document.location.reload()
    }

    const convertDate = date.slice(0, 19).replace('T', ' ')
    const user = JSON.parse(localStorage.getItem('user'));
    
    useEffect(() => {
        if (user.id !== userId || user.priv === 0) {
            setAuth(false)
        }
        else {
            setAuth(true)

        }
    }, [auth])

    //Affichage des PSOT
    return (
        <div className="post-content"  >
            {
                auth ? <button className="btn-trash" onClick={() => HandleClick(post_id)} value={post_id} data-post={post_id}><i className='bx bx-trash-alt '></i></button>
                :
                    null
            }
            <div className="feed-layout">
                <div className="feed-layout-header">
                    <div className="author">
                        <img src={avatar} alt={'image du post de ' + firstName + " " + lastName} />
                        <p className="post-auteur">{firstName} {lastName}</p>
                    </div>

                    <p className="post-date">{convertDate}</p>

                </div>
                <div className="feed-layout-message">
                    <p className='post-message'>{message}</p>
                    {cover == null ? null : <img src={cover} alt={"image du post de " + firstName + " " + lastName} />}
                </div>
                <div className="feed-layout-like">
                    <Like />
                </div>
                <div className="feed-layout-comment">
                    <Comment />
                </div>
            </div>
        </div>
    )
}



export default GetFeed