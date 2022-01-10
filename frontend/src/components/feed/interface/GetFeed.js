import './../../../styles/Post.css';
import Comment from './../comment/Comment';
import Like from './../comment/Like';
import AvatarImg from './../../../assets/avatar.png';

import axios from './../../config/Axios';
import { useState, useEffect } from 'react'



function GetFeed({ post_id, avatar, firstName, lastName, cover, message, date, userId, likes, commentMessage }) {
    const [auth, setAuth] = useState(false)
    //Supression de Post
    function HandleClick(post_id) {

        const params = {
            postId: post_id,
            user: userId
        }
        axios.delete('/api/post/', { data: { params } })
            .then(() => { console.log("OK") })
            .catch(err => {
                console.log(err)
            })

        document.location.reload(true)
    }



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
                auth ? <button aria-label="Supprimé le post" className="btn-trash" onClick={() => HandleClick(post_id)} value={post_id} data-post={post_id}><i className='bx bx-trash-alt '></i></button>
                    :
                    null
            }
            <div className="feed-layout">
                <div className="feed-layout-header">
                    <div className="author">
                        <img src={avatar == null ? AvatarImg : avatar} alt={'image du post de ' + firstName + " " + lastName} />
                        <p className="post-auteur">{firstName} {lastName}</p>
                    </div>

                    <p className="post-date">{date}</p>

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
                    <Comment
                        postId={post_id}
                        commentMessage={commentMessage}
                    />
                </div>
            </div>
        </div>
    )
}



export default GetFeed