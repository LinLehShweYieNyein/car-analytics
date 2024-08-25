import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import "/src/styles/AboutUs.css"; // Ensure you create this CSS file for custom styles

const AboutPage = () => {
  return (
    <Container
      fluid
      className="about-page"
      style={{ marginTop: "100px", marginBottom: "100px" }}
    >
      <Row className="text-center mb-5">
        <Col>
          <h2 className="display-4">About Us</h2>
          <p className="lead">
            Welcome to our website! We are dedicated to providing you with the
            best experience in car analytics and insights.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={6} lg={4} className="text-center">
          <Card className="shadow-sm border-light">
            <Card.Body>
              <Card.Title>Lin Leh Shwe Yie Nyein</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                u6520274@au.edu
              </Card.Subtitle>
              <Card.Text>ID : 6520274</Card.Text>
              <Card.Text></Card.Text>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
