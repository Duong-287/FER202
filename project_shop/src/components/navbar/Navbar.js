import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa"; // Import icon từ react-icons
import { GlobalContext } from "../../context/GlobalState";
import "./Navbar.css";

const CustomNavbar = () => {
  const { cart } = useContext(GlobalContext);

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <img src="/assets/logo.png" alt="TD SHOP" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/womens">
              Womens
            </Nav.Link>
            <Nav.Link as={Link} to="/mens">
              Mens
            </Nav.Link>
            <Nav.Link as={Link} to="/clothing">
              Clothing
            </Nav.Link>
            <Nav.Link as={Link} to="/brands">
              Brands
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart" className="nav-cart">
              &#128722;{" "}
              <span className="cart-count" style={{ color: "red" }}>
                ({cart.length})
              </span>
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              <FaUser size={20} style={{ color: "black" }} />{" "}
              {/* Thay thế nút Login bằng icon */}
            </Nav.Link>
            <Button variant="outline-primary" className="nav-btn">
              Hi, John
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
