import './../../../styles/Post.css';
import Comment from './../comment/Comment';
import Like from './../comment/Like';
import AvatarImg from './../../../assets/avatar.png';

import axios from 'axios';
import { useState, useEffect } from 'react'



function GetFeed({ post_id, postId, avatar, firstName, lastName, cover, message, date, userId, likes }) {

    const [auth, setAuth] = useState(false)
    //Supression de Post
    function HandleClick(post_id) {

        const params = {
            postId: post_id,
            user: userId
        }
        const user = JSON.parse(localStorage.getItem('user'));
        axios.delete(process.env.REACT_APP_URL_API + ':3000/api/post/', { data: { params }, headers: { "Authorization": `Bearer ${user.token}` } })
            .then(() => { console.log("OK") })
            .catch(err => {
                console.log(err)
            })

        document.location.reload()
    }

    const convertDate = date.slice(0, 19).replace('T', ' ')
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user.priv === 1) {
            setAuth(true)
        }
        else if (user.id !== userId) {
            setAuth(false)
        }
        else {
            setAuth(true)

        }
    }, []) // eslint-disable-line

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
                        <img src={avatar == null ? AvatarImg : avatar} alt={'image du post de ' + firstName + " " + lastName} />
                        <p className="post-auteur">{firstName} {lastName}</p>
                    </div>

                    <p className="post-date">{convertDate}</p>

                </div>
                <div className="feed-layout-message">
                    <p className='post-message'>{message}</p>
                    {cover == null ? null : <img src={cover} alt={"image du post de " + firstName + " " + lastName} />}
                </div>
                <div className="feed-layout-like">
                    <Like
                        post_id={post_id}
                        userId={userId}
                        like={likes}
                    />
                </div>
                <div className="feed-layout-comment">
                    <Comment />
                </div>
            </div>
        </div>
    )
}



export default GetFeed