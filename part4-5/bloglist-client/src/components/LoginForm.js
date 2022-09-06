import React from 'react';

const LoginForm = ({ username, password, handleSubmit, handleUsernameChange, handlePasswordChange }) => {

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            className="my-1"
             id="usernameField"

          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            className="my-1"
            id="passwordField"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;