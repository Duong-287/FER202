import React from 'react';
import { Container, Form, Button, InputGroup, Col, Row, Card,} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ShoppingCart.css';
import { Link } from 'react-router-dom';

export default function ShoppingCart() {
  return (
    <Container className="py-4">
      <h4 className="shoppingcart-header">Shopping Cart</h4>
      <Row>
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body className="card-body">
              <h5 className="card-title">2 Courses in Cart</h5>
              <Row className="mb-3">
                <Col md={4}>
                  <img src="./learning.jpg" className="img-fluid rounded" alt="Automate the Boring Stuff with Python Programming" />
                </Col>
                <Col md={5}>
                  <h6 className="card-subtitle mb-2" style={{fontWeight:'bold'}}>Automate the Boring Stuff with Python Programming</h6>
                  <p className="card-text">By Al Sweigart</p>
                  <p className="card-text">
                    <span className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </span>{' '}
                    (113,051 ratings)
                  </p>
                  <p className="card-text">9.5 total hours <span className="text-muted">· 51 lectures · All Levels</span></p>
                  <Button variant="outline-secondary" className="me-2">Remove</Button>
                  <Button variant="outline-secondary">Save for Later</Button>
                </Col>
                <Col md={3} className="text-center">
                  <p className="card-text">
                    <span className="text-decoration-line-through me-2">₫1,390,000</span><br />
                    <span className="fw-bold text-dark">₫249,000 <i className="bi bi-tag-fill"></i></span>
                  </p>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md={4}>
                  <img src="./learnpython.png" className="img-fluid rounded" alt="100 Days of Code: The Complete Python Pro Bootcamp" />
                </Col>
                <Col md={5}>
                  <h6 className="card-subtitle mb-2" style={{fontWeight:'bold'}}  >100 Days of Code: The Complete Python Pro Bootcamp</h6>
                  <p className="card-text">By Dr. Angela Yu, Developer and Lead Instructor and 1 other</p>
                  <p className="card-text">
                    <span className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </span>{' '}
                    (300,947 ratings)
                  </p>
                  <p className="card-text">
                    58.5 total hours <span className="text-muted">· 636 lectures · All Levels</span>
                    <span className="badge bg-primary me-1">Bestseller</span>
                  </p>
                  <Button variant="outline-secondary" className="me-2">Remove</Button>
                  <Button variant="outline-secondary">Save for Later</Button>
                </Col>
                <Col md={3} className="text-center">
                  <p className="card-text">
                    <span className="text-decoration-line-through me-2">₫2,190,000</span><br />
                    <span className="fw-bold text-dark">₫349,000 <i className="bi bi-tag-fill"></i></span>
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body className="text-center">
              <h5 className="card-title fw-bold">Total:</h5>
              <h2 className="card-text fw-bold">₫598,000</h2>
              <span className="text-decoration-line-through me-2">₫1,390,000</span><br />
              <Link to='/checkout'>
                  <Button variant="primary" size="lg" className="w-100 mt-3">Checkout</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5 className="card-title">Promotions</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter Coupon"
                  aria-label="Enter Coupon"
                  aria-describedby="basic-addon2"
                />
                <Button variant="primary" id="basic-addon2">Apply</Button>
              </InputGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
