import { useState } from 'react'
import PropTypes from "prop-types"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='togglableBlock'> 
      <div style={hideWhenVisible} className="toggleTitle">
         {props.toggleTitle} <button onClick={toggleVisibility}>{props.buttonShow}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
         {props.toggleTitle} <button onClick={toggleVisibility}>{props.buttonHide}</button>
        {props.children}
      </div>
    </div>
  )
}

Togglable.displayName = "Togglable";
Togglable.propTypes = {
  buttonShow: PropTypes.string.isRequired,
  buttonHide: PropTypes.string.isRequired,
};

export default Togglable