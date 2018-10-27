import React from 'react'
import BlogList from './BlogList'
import BlogForm from './BlogForm'


const BlogView = ({user, blogs, logoutHandle, updateBlogsHandle}) => (
    <div>
        <h2>blogs</h2>
        <p>{user.username} is logged in <button onClick={logoutHandle}>Logout</button></p>
        <BlogForm updateBlogsHandle={updateBlogsHandle}/>
        <BlogList blogs={blogs}/>
    </div>
);

export default BlogView