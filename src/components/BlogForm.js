import React, { useState } from 'react'

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    }, title, author)

    setUrl('')
    setTitle('')
    setUrl('')
  }


  return (
  <div>
    <form onSubmit={addBlog}>
      Title: <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br></br>
      Author: <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <br></br>
      Url: <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br></br>
      <button type="submit">Save</button>
    </form> 
    </div>
    ) 
}


export default BlogForm