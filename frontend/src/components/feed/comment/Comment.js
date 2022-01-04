import './Like.css';
import axios from 'axios';

function Comment({postId}){

    const PostComment = async() => {
        const user = JSON.parse(localStorage.getItem('user'));

        const commentContent = document.getElementById('commentMessage').value

        const comment = {
            postId: postId,
            commentMessage: commentContent
        } 

        axios.post(process.env.REACT_APP_URL_API + ':3000/api/comment/' + postId, {comment} ,{ headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    } 

    const handleSubmit = (e) => {
        e.preventDefault()
        PostComment();
    }

    return (
        <div>
            <div className="layout-comment">
                <div className="comment">
                    
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="commentMessage" placeholder="Ecrivez un commentaire.." aria-label="Ecrivez un commentaire" />
                    <button type="submit" aria-label="Envoyer" ><i className='bx bxs-edit'></i></button>
                </form>
            </div>
        </div>
    )
}

export default Comment;