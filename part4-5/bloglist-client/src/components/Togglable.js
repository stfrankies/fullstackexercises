import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div className="togglableBlock">
            <div style={hideWhenVisible} className="toggleTitle">
                <Link
                    to={`/blogs/${props.blogId}`}
                    className="block pb-4 text-xl font-bold"
                >
                    {props.toggleTitle}
                </Link>
                <div className="block">
                    <button
                        onClick={toggleVisibility}
                        id={props.buttonShow}
                        className="border-2 border-blue-950 text-lg px-8 hover:bg-white hover:text-blue-700 bg-blue-700 text-white py-2 rounded-lg"
                    >
                        {props.buttonShow}
                    </button>
                </div>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                <div className="pb-4 text-xl font-bold">
                    {' '}
                    {props.toggleTitle}
                </div>
                <button
                    onClick={toggleVisibility}
                    id={props.buttonHide}
                    className="border-2 border-blue-950 text-blue-700 text-lg px-8 hover:bg-blue-700 hover:text-white py-2 rounded-lg"
                >
                    {props.buttonHide}
                </button>
                {props.children}
            </div>
        </div>
    )
}

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
    buttonShow: PropTypes.string.isRequired,
    buttonHide: PropTypes.string.isRequired,
}

export default Togglable
