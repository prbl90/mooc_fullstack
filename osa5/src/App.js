import React from 'react'
import blogService from './services/blogs'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        blogs: [],
        user: null,
        error: null
    }
  }

  componentDidMount() {
      this.getBlogs();

      const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
      if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          this.setState({user});
          blogService.setToken(user.token);
      }
  }

  updateUser(user) {
      this.setState({user: user});
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
  }

  logoutUser() {
      this.setState({user: null});
      window.localStorage.removeItem('loggedBlogUser');
      blogService.setToken(null);
  }

  getBlogs() {
      blogService.getAll().then(blogs =>
          this.setState({ blogs })
      );
  }

  setError(error, autoClear) {
      this.setState({error: error});
      if(autoClear)
          setTimeout(() => this.setState({error: null}), 5000);
  }

  render() {
    return (
        <div>
            <Notification message={this.state.error}/>
            { this.state.user === null ? <LoginForm loginHandle={this.updateUser.bind(this)} setErrorHandle={this.setError.bind(this)}/> : <BlogView logoutHandle={this.logoutUser.bind(this)} user={this.state.user} blogs={this.state.blogs} updateBlogsHandle={this.getBlogs.bind(this)}/> }
        </div>
    );
  }
}

export default App;
