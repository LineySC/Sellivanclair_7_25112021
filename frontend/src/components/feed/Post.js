import './../../styles/Post.css';
import axios from './../config/Axios';
import React from "react";
import { Link } from "react-router-dom";

import GetFeed from './interface/GetFeed';
import PostFeed from './interface/PostFeed';
import Loader from '../loader/Loader';


class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            feed: [],
            isLoading: true,
            hasError: false,
            typeError: "",
            typeErrorMessage: "",
        }
        this.getFeed = this.getFeed.bind(this)
    }

    getFeed() {

        axios.get('/api/post')
            .then((res) => {
                this.setState({
                    feed: res.data.reverse(),
                    isLoading: false,
                    hasError: false
                })
            })
            .catch((err) => {
                if (err.response === undefined) {
                    
                }
                else {
                    console.log(err)
                    this.setState({
                        isLoading: true,
                        hasError: true,
                        typeError: err.response.status,
                    })
                }
            })
    }

    componentDidMount() {
        this.getFeed();
    }

    render() {
        if (this.state.isLoading) {
            if (this.state.typeError === '') {
                return (
                    <main>
                        <h1>Nous rencontrons un problème avec le serveur</h1>
                        <p>Merci de réessayer ultérieurement</p>
                    </main>
                )
            }
            else if (this.state.typeError === 401) {
                return (
                    <main>
                        <div>
                            <h1>Connexion expirée</h1>
                            <p>Merci de vous reconnecter</p>
                            <Loader />

                            <Link to="/auth">Connexion</Link>
                        </div>
                    </main>
                )
            }
            else {
                return (
                    <main>
                        <Loader />
                    </main>
                )
            }
        }
        else {
            return (
                <main>
                    <PostFeed />
                    <div className='layout-feed'>
                        {this.state.feed.map(({ id, privilege, user_id, userPostId, post_id, avatar_path, prenom, nom, image_path, message, postCreatedAt, likes, commentMessage }, index) => (

                            <GetFeed
                                key={index}
                                priv={privilege}
                                userId={user_id}
                                post_id={id}
                                cover={image_path}
                                avatar={avatar_path}
                                firstName={prenom}
                                lastName={nom}
                                message={message}
                                date={postCreatedAt}
                                commentMessage={commentMessage}
                                likes={likes}
                            />
                        ))}
                    </div>
                </main>
            )
        }

    }
}
export default Post