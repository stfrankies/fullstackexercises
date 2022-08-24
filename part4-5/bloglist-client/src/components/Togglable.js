import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
     
      <div style={hideWhenVisible}>
         {props.toggleTitle} <button onClick={toggleVisibility}>{props.buttonShow}</button>
      </div>
      <div style={showWhenVisible}>
         {props.toggleTitle} <button onClick={toggleVisibility}>{props.buttonHide}</button>
        {props.children}
      </div>
    </div>
  )
}

export default Togglable