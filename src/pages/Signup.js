import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import withSignupRequired from "../components/withSignupRequired";

/*
The Login function uses the useState hook to declare a state variable named email and its corresponding updater function setEmail. 
The initial state of email is set to an empty string ('').
This is also the same case for password and setPassword
*/
function Signup({ onSignupRequired }) {
    const [email, setEmail] = useState('');         
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [loading, setLoading] =  useState(false);
    const [error, setError] = useState('');

async function handleSignup(e) {
    e.preventDefault(); //Removes the default behavior of react, This allows you to handle form submission manually 
    
    try {
        setLoading(true);
        // Prepare the form data
        const formData = {
            email: email,
            password: password,
            name: name,
        };

        // Make a POST request to the backend API with the form data
        const response = await fetch('http://localhost:3001/users/signup', {
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
            console.log('Signup successful:', data);
            onSignupRequired(true);
            // You may want to redirect or perform other actions upon successful login
        } else {
            // Handle non-successful responses
            console.error('Error signing you up:', response.status, response.statusText);
        }
    } catch (error) {
        // Handle any network or other errors
        console.error('Error logging in:', error);
    }finally {
        setLoading(false);
    }
}


return (
    <Container className="signup-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={6} lg={5} xl={4}>
          <div className="signup-form-wrapper">
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form onSubmit={handleSignup}>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Group>

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
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}

              <div className="text-center mt-3">
                <p>
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default withSignupRequired(Signup);
