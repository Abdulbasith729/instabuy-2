import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import MegaSale from "../assets/assets/MegaSale.png";

const ShopperLogin = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [email, setEmail] = useState(''); // Replaced username with email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({
          email,   // Make sure 'email' and 'password' are the fields expected by the backend
          password
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        navigate('/home'); // Navigate on successful login
      } else {
        const errMessage = await response.json();
        setError(errMessage.message || 'Invalid login credentials');
      }
    } catch (err) {
      setError('An error occurred while trying to log in');
    }
  };
  
  

  // Inline styles for layout and elements
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh',
    padding: '2rem',
  };

  const leftStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background: 'orange',
    width: '50%',
  };

  const rightStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  };

  const imageStyle = {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    marginBottom: '2rem',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '0.25rem',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '1rem',
  };

  const linkStyle = {
    display: 'block',
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}>
        <img src={MegaSale} alt="Mega Sale" style={imageStyle} />
      </div>
      <div style={rightStyle}>
        <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ced4da' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ced4da' }}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" style={buttonStyle}>Login</button>
          <a
            href="#"
            style={linkStyle}
            onClick={() => navigate('/shopper-signup')} // Navigate to the sign-up page
          >
            Don't have an account? Sign Up
          </a>
        </form>
      </div>
    </div>
  );
}

export default ShopperLogin;
