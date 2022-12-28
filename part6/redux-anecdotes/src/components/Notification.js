import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  const notification = props.notification.message
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    
  }
  return (notification &&
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) =>({
  notification: state.notification
})

export default connect(mapStateToProps)(Notification);