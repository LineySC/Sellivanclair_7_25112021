import './../../styles/Post.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Post() {

    const [postId, setPostId] = useState([])

    const token = localStorage.getItem('token');
    //Récupération de tous les Post
    const getAllFeed = async () => {
        try {
            await axios
                .get('http://localhost:3000/api/post', { headers: { "Authorization": `Bearer ${token}` } })
                .then(res => {
                    for (let element of res.data) {
                        setPostId(element.id)
                        document.getElementById('post').innerHTML +=
                            `
                            <div class="post-content" id="${element.post_id}">
                                <button class="btn-trash onClick="${handleDelete}"><i class='bx bx-trash-alt '></i></button>
                                <div class="feed-layout">
                                    <div class="feed-layout-header">
                                        <p class="post-auteur">${element.prenom} ${element.nom}</p>
                                        <p class="post-date">${element.date}</p>
                                        
                                    </div>
                                    <div class="feed-layout-message">
                                        <p class='post-message'>${element.message}</p>
                                        <img src="${element.image_path}" alt="image du post de ${element.prenom} ${element.nom} "/>
                                    </div>
                                </div>
                            </div>
                        `;
                    }


                })
                .catch(e => console.log(e))
        }
        catch (e) {
            console.log(e)
        }
    }

    //Création de post

    const postFeed = async () => {
        try {

            const formData = new FormData();
            formData.set("feed_image", document.getElementById('img').files[0])
            formData.set("postMessage", document.getElementById('sendMessageForm').value)
            console.log(formData)

            await axios
                .post('http://localhost:3000/api/post',
                    formData,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        }
                    })
                .then(res => {
                    console.log(res)
                })
                .catch(console.log("cassé"))
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

    useEffect(() => {
        getAllFeed();
    }, [])

    //Supresion de post

    const handleDelete = (e) => {
        console.log(postId)
    }

    const deletePost = async () => {

        try {
            await axios
                .delete(`http://localhost:3000/api/post/${postId}`,
                    {},
                    { headers: { "Authorization": `Bearer ${token}` } })
                .then(res => {
                    console.log(res)
                })
                .catch(console.log("cassé"))
        }
        catch {
            console.error("ERROR")
        }

    }

    return (

        <main>
            <div id="postSend" className='post-form'>
                <form onSubmit={handleSubmit}>
                    <textarea id="sendMessageForm" />
                    <input type="file" id="img" />
                    <input className="btn-send-post" type="submit" value="Envoyer" />
                </form>
            </div>
            <div id="post" className='post'>

            </div>
        </main>
    )

}

export default Post