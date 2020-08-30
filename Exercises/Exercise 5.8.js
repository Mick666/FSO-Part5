import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const BlogTogglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    BlogTogglable.propTypes = {
        author: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                {props.title} by {props.author}
                <button onClick={toggleVisibility}>View</button>
            </div>
            <br></br>
            <div style={showWhenVisible} className='revealedBlog'>
                {props.title} by {props.author}
                <button onClick={toggleVisibility}>Hide</button>
                {props.children}
            </div>
        </div>
    )
}

const Blog = ({ blog, user, removePost, increaseLikes }) => {
    const [likes, setLikes] = useState(blog.likes)

    return (
        <div className='blogStyle'>
            <BlogTogglable buttonLabel='View' title={blog.title} author={blog.author} className='togglableBlog'>
                <div>
                    Url: {blog.url}
                    <br />
                    Likes: {likes}  <button onClick={() => increaseLikes(setLikes, blog)}>Like</button>
                    <br />
                    Author: {blog.author}
                    <br />
                    {user && user.username === blog.user.username ?
                        <button onClick={removePost} data-id={blog.id}>Remove</button> : <div></div>}
                </div>
            </BlogTogglable>
        </div>
    )
}

export default Blog

// App.js
const App = () => {

    // Not including everything for brevity

    const increaseLikes = (setLikes, blog) => {
        let updatedBlog = blog
        updatedBlog.likes = +updatedBlog.likes + 1
        blogService
            .increaseLikes(updatedBlog)
            .then(setLikes(updatedBlog.likes))
    }


    return (
        <div>
            <Notification message={notification} className={notificationType} />
            {user === null ?
                <div>
                    <h2>Please log in</h2>
                    {loginForm()}
                </div> :
                <div>
                    <h2>Blogs</h2>
                    {`${user.username} logged in`} <button onClick={handleLogOut}>Log you out</button>
                    <br></br>
                    <h2>Create new blog</h2>
                    {blogForm()}
                    <br></br>
                    {blogs.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={user}
                            removePost={removePost}
                            increaseLikes={increaseLikes} />
                    )}
                </div>
            }
        </div>
    )
}