import React, { Component } from 'react';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import background from '../../assets/images/background.jpg'

class Blog extends Component {
    state = {
        blogs: [],
        selectedPostId: null,
        error: false
    }

    getPostBodyHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    componentDidMount(){
        axios.get("/posts")
            .then(response => {
                const posts = response.data.slice(0,4)
                const updatedPosts = posts.map((post) => {
                    return{
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({blogs: updatedPosts})
            })
            .catch(() => {
                this.setState({error: true})
            })
    }

    render () {
        let posts = this.state.blogs.map((blog) => {
            return <Post key={blog.id} author={blog.author} title={blog.title} getPost={() => this.getPostBodyHandler(blog.id)}/>
        })
        if(this.state.error){
            posts = <p style={{textAlign: 'center'}}>Something went wrong...!</p>
        }
        return (
            <div className='Blog' style={{backgroundImage: `url(${background})`}}>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;