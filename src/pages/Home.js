import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

function Home() {
  return (
    <Container fluid className="home-container">
      <Row className="h-100">
        <Col className="d-flex flex-column justify-content-center align-items-center text-center">
          <div className="content-wrapper">
            <h1 className="main-title mb-4">Generate Your Official Letter</h1>
            <p className="lead mb-5">Create professional letters with ease using our intuitive platform.</p>
            <LinkContainer to='/login'>
              <Button variant="primary" size="lg" className="get-started-btn">
                Get Started
              </Button>
            </LinkContainer>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;