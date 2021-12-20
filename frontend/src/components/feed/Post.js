import './../../styles/Post.css';
import axios from 'axios';
import React from "react";
import GetFeed from './interface/GetFeed';
import PostFeed from './interface/PostFeed'


class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = { feed: [] }
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));

        axios.get('http://192.168.1.64:3000/api/post', { headers: { "Authorization": `Bearer ${user.token}` } })
            .then((res) => {
                this.setState({ feed: res.data })

            })
            .catch((e) => {
                console.log(e)
            })
    }

    render() {
        return (
            <main>
                <PostFeed />
                <div className='layout-feed'>
                    {this.state.feed.map(({ privilege, id, post_id, avatar_path, prenom, nom, image_path, message, date }) => (
                        <GetFeed
                            key={post_id}
                            priv={privilege}
                            userId={id}
                            post_id={post_id}
                            cover={image_path}
                            avatar={avatar_path}
                            firstName={prenom}
                            lastName={nom}
                            message={message}
                            date={date}
                        />
                    ))}
                </div>
            </main>
        )
    }
}
export default Post