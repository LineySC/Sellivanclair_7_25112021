import './Like.css';
import axios from 'axios';
import CommentForm from './CommentForm';


import './Comment.css'

import { useState, useEffect } from 'react';

const Comment = ({ postId }) => {

    const [comments, setComments] = useState([])



    const PostComment = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        const commentContent = document.getElementById('commentMessage').value

        const comment = {
            postId: postId,
            commentMessage: commentContent
        }

        axios.post(process.env.REACT_APP_URL_API + ':3000/api/comment/' + postId, { comment }, { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        async function getComment() {
            const res = await axios.get(process.env.REACT_APP_URL_API + ':3000/api/comment/' + postId)
            const data = res.data;
            if (comments !== data) {
                setComments((prevState) => [...prevState, ...data]);
            }
            else {
                console.log('Impossible de récupéré les donnée')
            }

        }
        getComment();
    }, [postId]) // eslint-disable-line

    const handleSubmit = (e) => {
        PostComment();
    }
    return (

        <div className="comment">
            <div className="comment-layout">
                {comments.map(({ user_id, commentId, prenom, nom, avatar_path, commentMessage, post_id }, index) => (
                    <CommentForm
                        key={index}
                        user_id={user_id}
                        commentId={commentId}
                        post_id={post_id}
                        firstName={prenom}
                        lastName={nom}
                        avatar_path={avatar_path}
                        commentMessage={commentMessage}
                    />
                ))}
            </div>

            <form onSubmit={handleSubmit} className='comment-form'>
                <input type="text" id="commentMessage" placeholder="Ecrivez un commentaire.." aria-label="Ecrivez un commentaire" autoComplete='off' />
                <div>
                    <button className='comment-btn-send' type="submit" aria-label="Envoyer" >
                        <i className='bx bxs-send'></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Comment;