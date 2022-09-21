import React from 'react';

const Notification = ({ message }) => {
  if (message.length === 0) {
    return null
  }

  if (message[0] === 'error') {
    return <div className="error">{`Error! ${message[1]}`}</div>
  }

  if (message[0] === 'success') {
    return <div className="success">{`Success! ${message[1]}`}</div>
  }
}

export default Notification; 