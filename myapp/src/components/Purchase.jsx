import React from 'react';
import { useCart } from '../components/CartContext/context'; // Import the custom hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Purchase = () => {
  const { cartItems } = useCart(); // Use the custom hook to get cart items
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  // Calculate the total price of all products in the cart
  const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);

  const handleShopMore = () => {
    navigate('/product'); // Navigate to the products page
  };

  return (
    <Container>
      <h1 className="my-4">Purchase Summary</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Nothing to purchase.</p>
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
                        style={{
                          maxWidth: '100%', // Ensure the image does not exceed its container width
                          height: 'auto', // Maintain aspect ratio
                          maxHeight: '150px' // Adjust this value to control the image height
                        }}
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
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="mt-4">
            <Col md={12} className="text-end">
              <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
              <Button variant="success" onClick={() => alert('Thank you for your purchase!')}>
                Logout
              </Button>
              <Button variant="primary" className="ms-2" onClick={handleShopMore}>
                Shop More
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Purchase;
