import React from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import './CheckOut.css';

export default function Checkout() {
  return (
    <Container className="checkout-container">
      <h1 className="checkout-header">Checkout</h1>
      <Row>
        <Col md={8}>
          <div className="summary-bg">
            <h2 className="section-header">Billing address</h2>
            <Form>
              <Form.Group controlId="formCountry">
                <Form.Label style={{fontWeight:'bold'}}>Country</Form.Label>
                <Form.Select style={{maxWidth:'50%'}}>
                  <option>Vietnam</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
              <Form.Text className="form-text">
                Udemy is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.
              </Form.Text>
            </Form>
            <br />
            <hr />
            <h2 className="section-header">Payment method <span className="secured-connection"><i class="bi bi-lock-fill"></i>Secured connection <i className="fas fa-lock"></i></span></h2>
            <ListGroup className="payment-method">
              <ListGroup.Item action href="#link1" className="payment-option">
                <input type="radio" name="payment" className="me-2" />
                <div className='payment-method-container'>
                  <img src='./card-default.svg' style={{ width: '42px', height: '28px' }} />
                  <span>Credit/Debit Card</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item action href="#link2" className="payment-option">
                <input type="radio" name="payment" className="me-2" />
                <div className='payment-method-container'>
                  <img src='./hpp-paypal.svg' style={{ width: '42px', height: '28px' }} />
                  <span>PayPal</span>
                </div>
              </ListGroup.Item>
            </ListGroup>
            <br />
            <hr />
            <h2 className="section-header">Order details</h2>
            <Card className="order-card">
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Card.Title className="d-flex card-title">
                      <img src="./learning.jpg" alt="course" className="course-image" />
                      The Complete Python Bootcamp From Zero to Hero in Python
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                    <Card.Text className="price-text">
                      <strong>₫249,000</strong> <span className="text-muted"><del>₫1,399,000</del></span>
                    </Card.Text>
                  </Col>
                </Row>


              </Card.Body>
            </Card>
            <Card className="order-card">
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Card.Title className="card-title">
                      <img src="./learnpython.png" alt="course" className="course-image" />
                      100 Days of Code: The Complete Python Pro Bootcamp
                    </Card.Title>
                  </Col>
                  <Col md={4}>
                    <Card.Text className="price-text">
                      <strong>₫349,000</strong> <span className="text-muted"><del>₫2,199,000</del></span>
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>

        </Col>

        <Col md={4}>
          <div className="summary-bg">
            <h2 className="section-header">Summary</h2>
            <ListGroup className="summary">
              <Form className="summary-item">
                <div className="summary-line">
                  <span>Original Price:</span> <span>₫3,598,000</span>
                </div>
                <div className="summary-line">
                  <span>Discounts:</span> <span>-₫3,000,000</span>
                </div>
                <div className="summary-line total-line">
                  <span>Total:</span> <span>₫598,000</span>
                </div>
              </Form>
            </ListGroup>
            <p className="terms">
              By completing your purchase you agree to these <a href="#terms">Terms of Service</a>.
            </p>
            <Button variant="primary" size="lg" block className="checkout-button">
              Complete Checkout
            </Button>
            <p className="guarantee">30-Day Money-Back Guarantee</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
