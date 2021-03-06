import axios from "./../../config/Axios";

function PostFeed() {

    const postFeed = async () => {
        try {
            
            const formData = new FormData();
            formData.set("feed_image", document.getElementById('img').files[0])
            formData.set("postMessage", document.getElementById('sendMessageForm').value)

            await axios.post('/api/post',formData)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        catch (e) {
            console.error(e)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postFeed();
        document.location.reload();
    }

    return (
        <div>
            <div id="postSend" className='post-form'>
                <form onSubmit={handleSubmit}>
                    <textarea id="sendMessageForm" placeholder="Quoi de neuf aujourd'hui ?" aria-label="Champ de texte pour posté un message " />
                    <input type="file" id="img" aria-label="Ajouté une image avotre post" />
                    <input className="btn-send-post" type={"submit"} value="Envoyer" aria-label="Envoyer" />
                </form>
            </div>
            <div id="post" className='post'>

            </div>
        </div>
    )

}

export default PostFeed