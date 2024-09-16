import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from '../components/Navbar'; // Import Navbar component

import CarusalOne from '../assets/assets/Carusal-1.png';
import Carusaltwo from '../assets/assets/Carusal-2.png';
import Carusalthree from '../assets/assets/Carusal-3.png';
import Companyone from '../assets/assets/Company-1.png';
import Companytwo from '../assets/assets/Company-2.png';
import CompanyThree from '../assets/assets/Company-3.png';
import Companyfour from '../assets/assets/Company-4.png';
import CompanyFive from '../assets/assets/Company-5.png';
import CompanySix from '../assets/assets/Company-6.png';

export default function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if the user is authenticated (for example, check if a token exists)
    const token = localStorage.getItem('token');
    if (!token) {
      // If the user is not authenticated, redirect to the login page
      navigate('/shopper-login');
    }
  }, [navigate]); // Only run this effect once on component mount

  const carouselItems = [
    { image: CarusalOne },
    { image: Carusaltwo },
    { image: Carusalthree }
  ];

  return (
    <div>
      <Navbar />
      <Carousel>
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <Row className="align-items-center">
              <Col md={6}>
                <div className="carousel-text" style={{ padding: 80 }}>
                  <h1 style={{ fontWeight: 700 }}>Shop with UTMOST</h1>
                  <h1 style={{ color: "#216ad9", fontWeight: 800 }}><i>Style</i></h1>
                  <h3 style={{ marginBottom: 20 }}>Shop with the latest</h3>
                  <div style={{ marginBottom: 20 }}>
                    {/* Navigate to /product when button is clicked */}
                    <Button variant="primary" style={{ width: "150px" }} onClick={() => navigate('/product')}>
                      Browse Product
                    </Button>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{ marginBottom: 20 }}>Products available from:</h3>
                    <img src={Companyone} alt="Company Logo 1" style={{ height: 50, marginRight: 10 }} />
                    <img src={Companytwo} alt="Company Logo 2" style={{ height: 50, marginRight: 10 }} />
                    <img src={CompanyThree} alt="Company Logo 3" style={{ height: 50, marginRight: 10 }} />
                    <img src={Companyfour} alt="Company Logo 4" style={{ height: 50, marginRight: 10 }} />
                    <img src={CompanyFive} alt="Company Logo 5" style={{ height: 50, marginRight: 10 }} />
                    <img src={CompanySix} alt="Company Logo 6" style={{ height: 50 }} />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <img src={item.image} alt={`Carousel Image ${index + 1}`} style={{ height: "90vh", objectFit: "contain", width: "100%" }} />
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
