import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import './Temp.css';

const TemplateForm = ({ onGenerateLetter }) => {
const [userInputs, setUserInputs] = useState({
date: '',
sender: '',
recipient: '',
subject: '',
});

const [generatedLetter, setGeneratedLetter] = useState('');

const handleInputChange = (e) => {
setUserInputs({
    ...userInputs,
    [e.target.name]: e.target.value,
});
};

const handleGenerateLetter = async () => {
try {
    // Make a POST request to the backend API
    const response = await fetch('http://localhost:3001/generate-letter', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInputs }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate letter');
    }

    // Assuming the response is a PDF blob, you can handle it accordingly
    const pdfBlob = await response.blob();

    // Do something with the generated PDF, e.g., open it in a new tab
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
    } catch (error) {
    console.error('Error generating letter:', error);
    }
// Assuming fixedTemplate is the content of your EJS template
const fixedTemplate = `
    <p>Ref: ${userInputs.date}</p>
    <p>Sender: ${userInputs.sender}</p>
    <p>Recipient: ${userInputs.recipient}</p>
    <p>Subject: ${userInputs.subject}</p>
    <!-- Add more fields based on your EJS template -->
`;

// Set the generated letter in the state
setGeneratedLetter(fixedTemplate);

// Optionally, you can pass the generated letter to a parent component or perform other actions
// onGenerateLetter(fixedTemplate);// I could use this in the sense if i wanted to send the generated letter to somewhere, lets say my database
};

return (
    <Container className="template-form-container">
      <h2 className="text-center mb-4">Generate Your Official Letter</h2>
      <Row>
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Body>
              <h3 className="mb-3">Enter Details:</h3>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formDate">
                      <Form.Label>Ref Num</Form.Label>
                      <Form.Control
                        type="text"
                        name="date"
                        placeholder="Ref Num"
                        value={userInputs.date}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formSender">
                      <Form.Label>Sender</Form.Label>
                      <Form.Control
                        type="text"
                        name="sender"
                        placeholder="Sender"
                        value={userInputs.sender}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formRecipient">
                      <Form.Label>Recipient</Form.Label>
                      <Form.Control
                        type="text"
                        name="recipient"
                        placeholder="Recipient"
                        value={userInputs.recipient}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formSubject">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={userInputs.subject}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" onClick={handleGenerateLetter} className="w-100">
                  Generate Letter
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <h3 className="mb-3">Preview:</h3>
              <div className="letter-preview" dangerouslySetInnerHTML={{ __html: generatedLetter }}></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TemplateForm;
