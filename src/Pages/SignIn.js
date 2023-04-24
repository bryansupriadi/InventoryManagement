import React, { useState } from 'react';
import LogoIM from '../Assets/logo.png';
import { useNavigate, Link } from 'react-router-dom';


function SignIn() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [errorMesssage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
      if (!email){
        setErrorMessage('Please enter the valid email!')
      } else{
        navigate('/otp')
      }
    // Lakukan validasi form dan proses login
  };

  return (
    <div className="App">
    <div className="login-page-container">
      <div className="login-image-container">
        <img src={LogoIM} alt="" />
      </div>
      <div className="login-form-container">
        <h2>Sign in to your account</h2>
        <h6>Welcome back! Please Enter Your Details.</h6>
        <form onSubmit={handleSubmit}>
          <div className="role-form">
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={handleRoleChange}>
              <option value="admin">User</option>
              <option value="user">Admin</option>
            </select>
          </div>
          <div className='email-form'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} />
          </div>
          {errorMesssage && <div className='error-message'>{errorMesssage}</div>}
          <button type="submit">Sign in</button>
        </form>
        <h5>Don't have an account? <Link to="/sign-up" style={{textDecoration: 'none', fontWeight: 'bold'}}>Sign Up</Link></h5>
      </div>
      </div>
    </div>
  );
}

export default SignIn;
