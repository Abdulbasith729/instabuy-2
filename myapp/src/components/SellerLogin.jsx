import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
// import MegaSale from "../assets/assets/MegaSale.png";
import Buy from '../assets/assets/Buy.png';

const SellerLogin = () => {
  const navigate = useNavigate(); // Initialize navigate function

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
    backgroundColor: 'pink',
    width: '50%',
    padding: '1rem',
  };

  const rightStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    padding: '1rem',
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
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const linkStyle = {
    display: 'block',
    marginTop: '1rem',
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '0.875rem',
  };

  const linkHoverStyle = {
    color: '#0056b3',
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}>
        <img src={Buy} alt="Mega Sale" style={imageStyle} />
      </div>
      <div style={rightStyle}>
        <form action="/login" method="post" style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                borderRadius: '0.25rem', 
                border: '1px solid #ced4da' 
              }} 
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                borderRadius: '0.25rem', 
                border: '1px solid #ced4da' 
              }} 
            />
          </div>
          <button type="submit" style={buttonStyle}>Seller Login</button>
          <a
            href="#"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = linkHoverStyle.color)}
            onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              navigate('/seller-signup'); // Navigate to the signup page
            }}
          >
            Don't have an account? Signup
          </a>
        </form>
      </div>
    </div>
  );
}

export default SellerLogin;
