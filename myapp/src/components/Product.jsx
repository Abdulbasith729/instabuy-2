import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext/context'; // Import the custom hook
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Navbar from './Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Filter Component
const Filter = ({ categories, onFilterChange }) => (
  <div className="mb-4">
    <h4>Filters</h4>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" onChange={e => onFilterChange(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  </div>
);

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart(); // Use the custom hook to get addToCart function
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/shopper-login');
      return; // Stop further execution if not authenticated
    }

    // Fetch products if authenticated
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
    navigate('/cart'); // Navigate to Cart component
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Loading products...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">Failed to load products: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <Row>
          <Col md={3} className="mb-4">
            <Filter categories={categories} onFilterChange={setSelectedCategory} />
            <Button variant="primary" className="w-100 mt-4" onClick={() => navigate('/cart')}>View Cart</Button>
          </Col>
          <Col md={9}>
            <h1 style={{ color: "orange" }}>Select product and add to cart</h1>
            <Row>
              {filteredProducts.length > 0 ? (
                filteredProducts.reduce((rows, product, index) => {
                  if (index % 5 === 0) rows.push([]);
                  rows[rows.length - 1].push(product);
                  return rows;
                }, []).map((row, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    {row.map(product => (
                      <Col key={product.id} md={2} className="mb-4">
                        <Card style={{ height: '100%' }}>
                          <Card.Img variant="top" src={product.image} alt={product.title} />
                          <Card.Body className="d-flex flex-column">
                            <Card.Title style={{ fontSize: '0.875rem', height: '2.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={product.title}>
                              {product.title}
                            </Card.Title>
                            <Card.Text style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>${product.price}</Card.Text>
                            <Button variant="success" className="mt-auto w-100" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <Col className="text-center">
                  <p>No products found.</p>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Product;
