import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from "./Navbar";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    discount: '',
    company: '',
    imageUrl: '',
  });
  const [previewProduct, setPreviewProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAdd = () => {
    setPreviewProduct(product);
    setProduct({
      title: '',
      description: '',
      price: '',
      discount: '',
      company: '',
      imageUrl: '',
    });
  };

  // Inline styles
  const cardStyle = {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    
  };

  const formControlStyle = {
    borderRadius: '5px',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
   
  };

  const buttonStyle = {
    borderRadius: '5px',
    padding: '10px 20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontWeight: 'bold',
  };

  const previewImageStyle = {
    height: '200px',
    objectFit: 'cover',
    borderBottom: '1px solid #ddd',
  };

  return (
    <>
      <Navbar />
      <Container className="my-4">
        <Row>
          {/* Left Column: Product Form */}
          <Col md={5} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <Card.Title>Add New Product</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={product.title}
                      onChange={handleChange}
                      placeholder="Enter product title"
                      style={formControlStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      placeholder="Enter product description"
                      style={formControlStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      placeholder="Enter product price"
                      style={formControlStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      type="number"
                      name="discount"
                      value={product.discount}
                      onChange={handleChange}
                      placeholder="Enter discount percentage"
                      style={formControlStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      name="company"
                      value={product.company}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      style={formControlStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="imageUrl"
                      value={product.imageUrl}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      style={formControlStyle}
                    />
                  </Form.Group>

                  <Button variant="primary" onClick={handleAdd} style={buttonStyle}>
                    Add Product
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column: Product Preview */}
          <Col md={7} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <Card.Title>Product Preview</Card.Title>
                {previewProduct ? (
                  <Card>
                    <Card.Img
                      variant="top"
                      src={previewProduct.imageUrl}
                      alt={previewProduct.title}
                      style={previewImageStyle}
                    />
                    <Card.Body>
                      <Card.Title>{previewProduct.title}</Card.Title>
                      <Card.Text>{previewProduct.description}</Card.Text>
                      <Card.Text>Price: ${previewProduct.price}</Card.Text>
                      <Card.Text>Discount: {previewProduct.discount}%</Card.Text>
                      <Card.Text>Company: {previewProduct.company}</Card.Text>
                    </Card.Body>
                  </Card>
                ) : (
                  <p>No product added yet. Fill out the form to add a product.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddProduct;
