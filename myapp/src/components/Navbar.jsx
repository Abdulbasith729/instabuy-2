import React from 'react';
import BootstrapNavbar from 'react-bootstrap/Navbar'; // Import Bootstrap Navbar with a different name
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCog } from '@fortawesome/free-solid-svg-icons';
import Logo from "../assets/assets/logo.png";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div>
      <BootstrapNavbar bg="light" expand="lg" id="MyNav">
        <Container>
          <BootstrapNavbar.Brand href="#home">
            <img
              alt="Logo"
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Instabuy
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Collapse className="justify-content-end">
            <div className="d-flex align-items-center">
              <Button variant="outline-primary" className="me-2" onClick={() => navigate('/cart')}>
                <FontAwesomeIcon icon={faShoppingCart} /> {/* Cart Icon */}
              </Button>
              <Button variant="outline-primary" className="me-2">
                <FontAwesomeIcon icon={faCog} /> {/* Settings Icon */}
              </Button>
              <Button variant="primary" onClick={() => navigate('/shopper-login')}>Logout</Button> {/* Navigate to login page on logout */}
            </div>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </div>
  );
}

export default Navbar;
