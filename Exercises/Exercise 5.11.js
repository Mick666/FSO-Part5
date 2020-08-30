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
            <div style={showWhenVisible}>
                {props.title} by {props.author}
                <button onClick={toggleVisibility}>Hide</button>
                {props.children}
            </div>
        </div>
    )
}