import React from 'react'
import blogService from '../services/blogs'

class BlogForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            url: '',
            likes: 0,
            error: ''
        }
    }


    handleDataFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    createBlog = async (event) => {
        event.preventDefault();
        try {
            await blogService.create({
                title: this.state.title,
                author: this.state.author,
                url: this.state.url,
                likes: this.state.likes,
            });

            this.setState(
                {
                    title: '',
                    author: '',
                    url: '',
                    likes: 0
                });

            this.props.updateBlogsHandle();
        } catch(exception) {
            this.setState({
                error: 'Error in creating new blog',
            });
            setTimeout(() => {
                this.setState({ error: null })
            }, 5000)
        }
    };

    render() {
        return <div>
            <h3>create new blog</h3>

            <form onSubmit={this.createBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleDataFieldChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        name="author"
                        value={this.state.author}
                        onChange={this.handleDataFieldChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        name="url"
                        value={this.state.url}
                        onChange={this.handleDataFieldChange}
                    />
                </div>
                <div>
                    likes:
                    <input
                        type="number"
                        name="likes"
                        value={this.state.likes}
                        onChange={this.handleDataFieldChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
            <p>{this.state.error}</p>
        </div>
    }

}

export default BlogForm;