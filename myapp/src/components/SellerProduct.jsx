import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Navbar from "./Navbar";

// Helper function to prepare chart data
const getChartData = (products) => {
  const labels = products.map(product => product.title);
  const salesData = products.map(product => product.price); // For simplicity, using price as sales data

  return {
    labels,
    datasets: [
      {
        label: 'Sales Performance',
        data: salesData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };
};

// SellerProduct Component
const SellerProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from Fake Store API
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (productId) => {
    alert(`Update product with ID: ${productId}`);
    // Navigate to edit product page, implement as needed
  };

  const handleDelete = async (productId) => {
    console.log(`Attempting to delete product with ID: ${productId}`); // Log the ID
    if (window.confirm(`Are you sure you want to delete product with ID: ${productId}?`)) {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/delete-products/${productId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert('Product deleted successfully');
          // Refresh or update product list
        } else {
          const result = await response.json();
          alert(`Failed to delete product: ${result.message}`);
        }
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  
  if (loading) {
    return (
      <Container className="text-center my-5">
        <p>Loading products...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <p>Failed to load products: {error.message}</p>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container className="my-4">
        <Row>
          {/* Sales Performance Chart */}
          <Col md={5} className="mb-4"> {/* Adjusted to 40% width */}
            <Card>
              <Card.Body>
                <Card.Title>Sales Performance</Card.Title>
                <div style={{ height: '500px' }}> {/* Adjust height for better visibility */}
                  <Bar
                    data={getChartData(products)}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => `Price: $${context.raw}`
                          }
                        }
                      }
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Products List */}
          <Col md={7} className="mb-4"> {/* Adjusted to 60% width */}
            <Card>
              <Card.Body>
                <Card.Title>Product List</Card.Title>
                <Row>
                  {products.length > 0 ? (
                    products.map(product => (
                      <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
                        <Card style={{ width: '100%', maxWidth: '200px', height: 'auto' }}> {/* Adjust card size */}
                          <Card.Img variant="top" src={product.image} alt={product.title} style={{ objectFit: 'contain', height: '120px' }} />
                          <Card.Body>
                            <Card.Title style={{ fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</Card.Title>
                            <Card.Text>${product.price}</Card.Text>
                            <Card.Text style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className="text-truncate">{product.description}</Card.Text>
                            <Button variant="primary" onClick={() => handleUpdate(product.id)} className="me-2">
                              Update
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(product.id)}>
                              Delete
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Col className="text-center">
                      <p>No products available.</p>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SellerProduct;
