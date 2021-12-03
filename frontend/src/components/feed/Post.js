import './../../styles/Post.css';


function Post () {
    return (
        <main>
            <div id="postSend" className='post-form'>
                <form>
                    <textarea id="sendMessageForm"/>
                    <input type="button"  className="btn-send-post" value="Envoyer"/>
                </form>
            </div>
            <div id="post" className='post'>

            </div>
        </main>
    )

}

/*function sendPost() {
    const postMessage = document.getElementById('sendMessageForm')

    const sendReq = {
        message: postMessage.value,
    }

}*/

const postUrl ='http://localhost:3000/api/post'

fetch(postUrl)
.then(res => {
    if(res.ok){
        return res.json()
    }
})
.then(post => {
    console.log(post)
    post.forEach(element => {
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
.catch(err => console.log(err))

console.log(localStorage.getItem('token'))

export default Post