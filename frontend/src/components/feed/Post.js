import './../../styles/Post.css';
import axios from 'axios';


function Post() {

    const token = localStorage.getItem('token');
    //Récupération de tous les Post
    const getAllFeed = async () => {
        try {
            const data = await axios
                .get('http://localhost:3000/api/post', { headers: { "Authorization": `Bearer ${token}` } })
                .then(res => {
                    res.data.forEach(element => {
                        document.getElementById('post').innerHTML +=
                            `
                            <div class="post-content">
                                <p class="post-auteur">${element.auteur}</p>
                                <div class="post-date">${element.date}</div>
                                <div class='post-message'>${element.message}</div>
                            </div>
                        `
                    });


                })
                .catch(e => console.log(e))
        }
        catch (e) {
            console.log(e)
        }
    }

    //Création de post

    const messagePost = document.getElementById('sendMessageForm')

    const postFeed = async () => {
        const headersConfig = { headers: { "Authorization": `Bearer ${token}` } }

        try {
            const message = messagePost.value;
            const datas = await axios

                .post('http://localhost:3000/api/post', {
                    message,
                    headersConfig

                })
                .then(res => {
                    console.log(res)
                })
                .catch(console.log("cassé"))
        }
        catch {
            console.log("Raté ! Cela ne fonctionne pas !")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postFeed();
    }

    getAllFeed();
    return (
        <main>
            <div id="postSend" className='post-form'>
                <form onSubmit={handleSubmit}>
                    <textarea id="sendMessageForm" />
                    <input className="btn-send-post" type="submit" value="Envoyer" />
                </form>
            </div>
            <div id="post" className='post'>

            </div>
        </main>
    )



}








export default Post