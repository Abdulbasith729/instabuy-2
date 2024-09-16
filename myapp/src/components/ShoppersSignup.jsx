import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import MegaSale from "../assets/assets/MegaSale.png";

const ShopperSignUp = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

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
    backgroundColor: 'orange',
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
    marginTop: '1rem',
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Navigate to seller-login on successful registration
        navigate('/seller-login');
      } else {
        // Handle errors
        console.error('Error registering user');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}>
        <img src={MegaSale} alt="Mega Sale" style={imageStyle} />
      </div>
      <div style={rightStyle}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ced4da' }}
              aria-label="Username"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ced4da' }}
              aria-label="Email"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ced4da' }}
              aria-label="Password"
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Signup
          </button>
          <a
            href="#"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = linkHoverStyle.color)}
            onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              navigate('/shopper-login'); // Navigate to the login page
            }}
          >
            Already have an account? Login
          </a>
        </form>
      </div>
    </div>
  );
};

export default ShopperSignUp;
