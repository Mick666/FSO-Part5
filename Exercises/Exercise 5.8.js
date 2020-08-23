import React, { useState } from 'react'
import blogService from '../services/blogs'


const BlogTogglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  

  return (
    <div>
      <div style={hideWhenVisible}>
        {props.title} by {props.author}
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        {props.title} by {props.author}
        <button onClick={toggleVisibility}>Hide</button>
        {props.children}
      </div>
    </div>
  )
}

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes)
  const increaseLikes = () => {
    let updatedBlog = blog
    updatedBlog.likes = +updatedBlog.likes + 1
    blogService
    .increaseLikes(updatedBlog)
    .then(setLikes(updatedBlog.likes))
  }

  return (
    <div  className='blogStyle'>
    <BlogTogglable buttonLabel='View' title={blog.title} author={blog.author}>
      <div>
      Url: {blog.url}
      <br></br>
      Likes: {likes}  <button onClick={increaseLikes}>Like</button>
      <br></br>
      Author: {blog.author}
      <br></br>
        </div>
    </BlogTogglable>
  </div>
  )
}

export default Blog