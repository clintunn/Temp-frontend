import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>Template-App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">{/** ms is used to add margin to the left making the components to be on the right */}
            <LinkContainer to='/login'>
            <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/signup'>
            <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
            <Nav.Link>Generate Template</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;