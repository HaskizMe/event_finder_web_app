import { useState, useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import color from '../theme/colors';
import { AuthContext} from "../context/AuthContext";
const MainNav = () => {
  const { user, logout } = useContext(AuthContext); // Get user state & logout function

  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Top Section */}
      <div style={styles.topBar}>
        <Container>
          <div style={styles.topBarInner}>
            {user ? (
              <Button onClick={logout} style={styles.loginButton}>Log out</Button>
            ) : (
              <Button as={Link} to="/login" style={styles.loginButton}>Log in</Button>
            )}
            <Button as={Link} to="/signup" style={styles.signupButton}>Sign up</Button>
          </div>
        </Container>
      </div>

      {/* Bottom Section - Navbar */}
      <Navbar expand="lg" style={styles.navBar}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: color.red, fontSize: '30px' }}>
            AroundU
          </Navbar.Brand>
          
          {/* Custom Styled Toggle Button */}
          <Navbar.Toggle
            aria-controls="navbarNav"
            onClick={() => setExpanded(expanded ? false : true)}
            style={styles.navbarToggle} // Set custom style
          />

          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" style={styles.navLink}>Home</Nav.Link>
              <Nav.Link as={Link} to="/search" style={styles.navLink}>Search Events</Nav.Link>
              <Nav.Link as={Link} to="/my-events" style={styles.navLink}>My Events</Nav.Link>
              <Nav.Link as={Link} to="/about" style={styles.navLink}>About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const styles = {
  topBar: {
    backgroundColor: color.white,
    padding: "10px 0",
  },
  topBarInner: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  navBar: {
    backgroundColor: color.white,
    color: color.richBlack,
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
  },
  navLink: {
    color: color.red,
    textDecoration: "none",
    padding: "10px 15px",
  },
  loginButton: {
    background: "transparent",
    color: color.richBlack,
    border: "none",
    marginRight: "10px",
  },
  signupButton: {
    background: color.red,
    color: color.white,
    border: "none",
    padding: "6px 14px",
    borderRadius: "4px",
  },
  navbarToggle: {
    border: "none", // Remove border outline
    backgroundColor: "transparent",
  },
};

// Custom CSS to change the navbar toggle (hamburger) icon color
const customStyle = `
  .navbar-toggler-icon {
    filter: invert(1); /* Makes it black */
  }
`;

// Inject custom style into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customStyle;
document.head.appendChild(styleSheet);

export default MainNav;