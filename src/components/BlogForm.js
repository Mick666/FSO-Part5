import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
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
        <div className='formDiv'>
            <form onSubmit={addBlog}>
                Title: <input
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
      Author: <input
                    id='author'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <br />
      Url: <input
                    id='url'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}


export default BlogForm