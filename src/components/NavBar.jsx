import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '/src/styles/NavBar.css';

const NavBar = () => {
  return (
    <Navbar bg="danger" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand as={Link} to="/" className="brand-name ms-5">
        Lin Leh Car Analytics
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
          <Nav.Link as={Link} to="/insights">Insights</Nav.Link>
          <Nav.Link as={Link} to="/about">About Us</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
