import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import MegaSale from "../assets/assets/MegaSale.png";
import Buy from '../assets/assets/buy.png';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const FirstPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Inline styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh',
    padding: '2rem',
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background : 'blue'
  };

  const imageStyle = {
    maxWidth: '90%',
    height: 'auto',
    maxHeight: '35rem',
    padding: '1rem',
  };

  const buttonStyle = {
    marginTop: '1rem',
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
    ...buttonStyle,
    backgroundColor: '#0056b3',
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <img src={MegaSale} alt="Mega Sale" style={imageStyle} />
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
          onClick={() => navigate('/shopper-login')} // Navigate to shopping cart page
        >
          Shopping Cart
        </button>
      </div>
      <div style={sectionStyle}>
        <img src={Buy} alt="Buy" style={imageStyle} />
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
          onClick={() => navigate('/seller-login')} // Navigate to seller cart page
        >
          Seller Cart
        </button>
      </div>
    </div>
  );
}

export default FirstPage;
