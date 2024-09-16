import React, { useEffect, useState } from 'react';
import { useCart } from '../components/CartContext/context'; // Import the custom hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Cart = () => {
  const { cartItems, removeFromCart, saveCart } = useCart(); // Use the custom hook
  const navigate = useNavigate(); // Hook for navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check login status

  useEffect(() => {
    // Example: Check if user is logged in
    const checkLoginStatus = () => {
      // Replace with actual login check (e.g., check if a token exists)
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        setIsLoggedIn(true);
        // Load cart for the logged-in user (pseudo-code, replace with actual logic)
        fetchCartForUser(userToken);
      } else {
        setIsLoggedIn(false);
        navigate('/shopper-login'); // Redirect to login page if not logged in
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const fetchCartForUser = (userToken) => {
    // Fetch cart items from API or localStorage (pseudo-code)
    fetch('/api/cart', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle cart data
        saveCart(data); // Save cart items to context
      })
      .catch(err => {
        console.error('Failed to fetch cart:', err);
      });
  };

  const handlePurchase = () => {
    navigate('/purchase'); // Navigate to the Purchase component
  };

  // Inline styles for image
  const imageStyle = {
    maxWidth: '50%', // Ensure the image does not exceed its container width
    height: 'auto', // Maintain aspect ratio
    maxHeight: '150px' // Adjust this value to control the image height
  };

  if (!isLoggedIn) {
    return null; // Render nothing if the user is not logged in
  }

  return (
    <Container>
      <h1 className="my-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Row>
            {cartItems.map(product => (
              <Col key={product.id} md={12} className="mb-4">
                <Card>
                  <Row noGutters>
                    <Col md={4} className="d-flex justify-content-center align-items-center">
                      <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.title}
                        style={imageStyle} // Apply inline styles to image
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                          <strong>Price:</strong> ${product.price}
                        </Card.Text>
                        <Card.Text>
                          <strong>Quantity:</strong> 1 {/* Adjust as needed */}
                        </Card.Text>
                        <Button
                          variant="danger"
                          onClick={() => removeFromCart(product.id)}
                        >
                          Remove from Cart
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
          <Button
            variant="success"
            onClick={handlePurchase}
            style={{ marginTop: '1rem' }} // Apply inline styles for spacing
          >
            Proceed to Purchase
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
