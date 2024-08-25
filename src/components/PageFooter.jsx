import { Container, Row, Col } from "react-bootstrap";
import {
  FaHome,
  FaHeart,
  FaLightbulb,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import "/src/styles/PageFooter.css";

const PageFooter = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="text-center">
          <Col md={12} className="footer-section">
            <p>&copy; 2024 Car Insights. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default PageFooter;
