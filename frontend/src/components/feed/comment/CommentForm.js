import axios from './../../config/Axios';
import { useState, useEffect } from 'react'
import AvatarDefault from './../../../assets/avatar.png'

function CommentForm({ user_id, post_id, commentId, firstName, lastName, avatar_path, commentMessage }) {

    const [auth, setAuth] = useState(false)

    function handleDelete(post_id, commentId) {
        console.log(post_id, commentId)
        const params = {
            post_id: post_id,
            commentId: commentId
        }
        axios.delete('/api/comment', { data: { params } })
            .then(res => {console.log("goos")}
                )
            .catch(err => {console.log(err)})
        window.location.reload()
    }
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user.priv === 1) {
            setAuth(true)
        }
        else if (user.id !== user_id) {
            console.log(user_id)
            setAuth(false)
        }
        else {
            setAuth(true)

        }
    }, []) // eslint-disable-line


    return (
        <div className="comment-content">
            <div className="comment-box">
                <img className="comment-author-img" src={avatar_path === null ? AvatarDefault : avatar_path} alt={"Image de profile de " + firstName + " " + lastName} />
                <div className="comment-author-message">
                    <p>{firstName + ' ' + lastName}</p>
                    <p>{commentMessage}</p>
                </div>
                {auth ? <button aria-label="Supprimé le post" className="btn-comment-trash" onClick={() => handleDelete(post_id, commentId)}>
                    <i className="bx bx-trash-alt"></i>
                </button> : null}

            </div>

        </div>
    )
}

export default CommentForm