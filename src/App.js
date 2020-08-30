import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState(null)
    const [notificationType, setNotificationType] = useState('error')
    const [user, setUser] = useState(null)

    const blogFormRef = React.createRef()

    useEffect(() => {
        let loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            if (user === null) return
            setUser(user)
            console.log(user)
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

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setUser(user)
                setNotificationType('notification')
                setNotification(`New blog ${blogObject.title} by ${blogObject.author} added`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

    const removePost = (event) => {
        console.log(event.target.dataset.id)
        blogService
            .deletePost(event.target.dataset.id)
            .then(setBlogs(blogs.filter(blog => blog.id !== event.target.dataset.id)))
            .catch(error => console.log(error))
    }


    const loginForm = () => (
        <Togglable buttonLabel='login'>
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />
        </Togglable>
    )

    const blogForm = () => (
        <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )


    const increaseLikes = (setLikes, blog) => {
        let updatedBlog = blog
        updatedBlog.likes = +updatedBlog.likes + 1
        blogService
            .increaseLikes(updatedBlog)
            .then(setLikes(updatedBlog.likes))
    }

    useEffect(() => {
        blogService.getAll().then(blogs => {
            console.log(blogs)
            setBlogs( blogs)
        })
    }, [])

    return (
        <div>
            <Notification message={notification} className={notificationType}/>
            {user === null ?
                <div>
                    <h2>Please log in</h2>
                    {loginForm()}
                </div>:
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
                            increaseLikes={increaseLikes}/>
                    )}
                </div>
            }
        </div>
    )
}

export default App