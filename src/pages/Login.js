import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import withSignupRequired from "../components/withSignupRequired";
import LayoutWithoutNav from "../components/LayoutWithoutNav";

/*
The Login function uses the useState hook to declare a state variable named email and its corresponding updater function setEmail. 
The initial state of email is set to an empty string ('').
This is also the same case for password and setPassword
*/
function Login({ onSignupRequired }) {
    const [email, setEmail] = useState('');         
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleLogin(e) {
        e.preventDefault(); // Prevents the default behavior of form submission
    
        try {
            setLoading(true);
            // Prepare the form data
            const formData = {
                email: email,
                password: password,
            };
    
            // Make a POST request to the backend API with the form data
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            // Check if the request was successful (status code 2xx)
            if (response.ok) {
                // Parse the response JSON if applicable
                const data = await response.json();
                console.log('Login successful:', data);
                // You may want to redirect or perform other actions upon successful login
                onSignupRequired(true);
            } else {
                // Handle non-successful responses
                const errorData = await response.json();
                console.error('Error logging in:', response.status, errorData.message);
                setError(errorData.message || 'An unexpected error occurred. Please try again or create an account');
                onSignupRequired(false);
            }
        } catch (error) {
            // Handle any network or other errors
            console.error('Error logging in:', error);
            setError('An unexpected error occurred. Please try again.');
        }finally {
            setLoading(false);
        }
    }
    

    return (
        <LayoutWithoutNav>
          <Container className="login-container">
            <Row className="justify-content-center align-items-center min-vh-100">
              <Col md={6} lg={5} xl={4}>
                <div className="login-form-wrapper">
                  <h2 className="text-center mb-4">Log In</h2>
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </Form.Group>
    
                    <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
    
                    {error && (
                      <Alert variant="danger" className="mt-3">
                        {error}
                      </Alert>
                    )}
    
                    <div className="text-center mt-3">
                      <p>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                      </p>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </LayoutWithoutNav>
      );
    }
    
    export default withSignupRequired(Login);