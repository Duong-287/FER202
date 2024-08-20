import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual login logic
    if (email === "test@example.com" && password === "password") {
      alert("Login successfully!");
    } else {
      setError("Email or password is incorrect");
    }
  };

  const handleLoginWithGoogle = () => {
    // Handle Google login logic
    alert("Login with Google clicked");
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center login-container"
    >
      <Row className="w-100 justify-content-center">
        <Col md="8" lg="6" xl="4">
          <Card
            className="shadow-lg p-4 border-0"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <div className="text-center mb-4">
                <Button
                  variant="light"
                  style={{ borderColor: "rgb(220,220,220)" }}
                  className="w-100"
                  onClick={handleLoginWithGoogle}
                >
                  <img
                    src="goo.jpeg"
                    width="20"
                    height="20"
                    className="me-2"
                    alt="Google Logo"
                  />
                  Login with Google
                </Button>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Login
                </Button>
              </Form>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="text-center mt-3">
                <Link to="/fogotPassword" className="d-block">
                  Forgot Password?
                </Link>
                <Link to="/changePassword" className="d-block mt-2">
                  Change Password
                </Link>
                <Link to="/register" className="d-block mt-2">
                  Register New Account
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
