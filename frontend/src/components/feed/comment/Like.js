import './Like.css';
import axios from 'axios';
import React from 'react';
//import { useState, useEffect } from 'react';

class Like extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            res: [],
            nbLikes: '',
        }
    }

    getLike(){
        const user = JSON.parse(localStorage.getItem('user'));

        axios.get(process.env.REACT_APP_URL_API + ':3000/api/like', { headers: { "Authorization": `Bearer ${user.token}` } })
            .then((res) => {

                let nbLikes = []
                res.data.forEach(element => {
                    nbLikes.push(element.likes)
                });
                const sum = nbLikes.reduce(function (a, b) { return a + b; }, 0)


                this.setState({
                    res: res.data,
                    nbLikes: sum,
                })

                
            })
            .catch((e) => {
                console.log(e)
            })
    }

    componentDidMount() {
        this.getLike();
        
    }
    componentDidUpdate(){
        if (this.res !== this.res) { // eslint-disable-line
            this.getLike();
        }
    }

    handleLike() {

        const user = JSON.parse(localStorage.getItem('user'));
        axios.post(process.env.REACT_APP_URL_API + `:3000/api/like/` + this.props.post_id, "", { headers: { "Authorization": `Bearer ${user.token}` } })
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <div className="layout-like">
                    {
                        this.state.nbLikes === null ?
                            <div>
                                <button aria-label="Bouton pour liké un post" onClick={() => { this.handleLike(this.props.post_id) }}>
                                    <i className='bx bxs-like'></i>
                                </button>
                            </div>
                            :
                            <div>
                                <button aria-label="Bouton pour liké un post" onClick={() => { this.handleLike(this.props.post_id) }}>
                                    <i className='bx bx-like'></i>
                                </button>
                            </div>
                    }
                </div>
            </div>
        )
    }
}



/*function Like({ post_id, like }) {


    function handleLike(post_id) {

        const user = JSON.parse(localStorage.getItem('user'));

        axios.post(process.env.REACT_APP_URL_API + ':3000/api/like/' + post_id, "", { headers: { "Authorization": `Bearer ${user.token}` } })
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }
    
    
    return (
        <div>
            <div className="layout-like">
                {
                    like === null ?
                        <div>
                            <button onClick={() => handleLike(post_id) + like}>
                                <i className='bx bx-like'></i>
                            </button>
                        </div>
                        :
                        <div>
                            <button onClick={() => handleLike(post_id)}>
                                <i className='bx bxs-like'></i>
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}*/

export default Like