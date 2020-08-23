import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('error')
  const [user, setUser] = useState(null) 

  useEffect(() => {
    let loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      if (user === null) return;
      setUser(user)
      blogService.setToken(user.token)    
    }  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      console.log(window.localStorage.getItem('loggedBlogappUser'))

      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationType('error')
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.setItem(
      'loggedBlogappUser', null
    ) 
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
      token: user
    }

    blogService
    .create(newBlog)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setUser('')
      setTitle('')
      setUrl('')
      setUser(user)

      setNotificationType('notification')
      setNotification(`New blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
  }

  const blogForm = () => (
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
      <button type="submit">save</button>
    </form>  
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <Notification message={notification} className={notificationType}/>
      {user === null ? 
      <div>
        <h2>Please log in</h2>
        {loginForm()}</div>: 
      <div>
      <h2>Blogs</h2>
      {`${user.username} logged in`} <button onClick={handleLogOut}>Log you out</button>
      <br></br>
      <h2>Create new blog</h2>
        {blogForm()}
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
      }
    </div>
  )
}

export default App

// Notification

import React from 'react'

const Notification = ({ message, className}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification

// Blog

import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

export default Blog


//BlogService
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token},
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, setToken, create}

//Login

import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }