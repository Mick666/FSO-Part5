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

const Blog = ({ blog, user, removePost }) => {
  console.log(user)
  const [likes, setLikes] = useState(blog.likes)
  const increaseLikes = () => {
    let updatedBlog = blog
    console.log(updatedBlog)
    updatedBlog.likes = +updatedBlog.likes + 1
    blogService
    .increaseLikes(updatedBlog)
    .then(setLikes(updatedBlog.likes))
    console.log(updatedBlog)
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
      {user && user.username === blog.user.username ? 
      <button onClick={removePost} data-id={blog.id}>Remove</button> : <div></div>}
        </div>
    </BlogTogglable>
  </div>
  )
}

export default Blog