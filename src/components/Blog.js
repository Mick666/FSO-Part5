import React, { useState } from 'react'
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