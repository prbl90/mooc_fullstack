import React from 'react'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        blogs: [],
        user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  updateUser(user) {
      this.setState({user: user});
  }

  render() {
    return (
        <div>
        { this.state.user === null ? <LoginForm loginHandle={this.updateUser.bind(this)}/> : <BlogList blogs={this.state.blogs}/> }
        </div>
    );
  }
}

export default App;
