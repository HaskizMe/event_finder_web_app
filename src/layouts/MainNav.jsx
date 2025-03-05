import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import color from '../theme/colors';
import { AuthContext } from "../context/AuthContext";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const MainNav = () => {
  const { user, logout } = useContext(AuthContext); // Get user state & logout function
  const [expanded, setExpanded] = useState(false);
  const [weather, setWeather] = useState(null); // 🔹 Store weather data
  const [error, setError] = useState(null); // 🔹 Handle geolocation errors

  useEffect(() => {
    // Fetch user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            setWeather({
              temp: Math.round(data.main.temp),
              condition: data.weather[0].main,
              city: data.name
            });
          } catch (err) {
            console.error("Weather API error:", err);
            setError("Weather unavailable");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError("Location access denied");
        }
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  return (
    <>
      {/* Top Section */}
      <div style={styles.topBar}>
        <Container>
          <div style={styles.topBarInner}>
            {/* 🔹 Weather Section - Displays weather in the top left */}
            <div style={styles.weather}>
              {error ? (
                <span>{error}</span>
              ) : weather ? (
                <span>🌤 {weather.city}: {weather.temp}°C {weather.condition}</span>
              ) : (
                <span>Loading weather...</span>
              )}
            </div>

            <div>
              {user ? (
                <Button onClick={logout} style={styles.loginButton}>Log out</Button>
              ) : (
                <>
                  <Button as={Link} to="/login" style={styles.loginButton}>Log in</Button>
                  <Button as={Link} to="/signup" style={styles.signupButton}>Sign up</Button>
                </>
              )}
            </div>
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
    display: "flex",
    justifyContent: "space-between", // 🔹 Ensures weather is on the left
  },
  topBarInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  weather: {
    fontSize: "14px",
    color: color.richBlack,
    fontWeight: "bold",
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
    border: "none",
    backgroundColor: "transparent",
  },
};

// Custom CSS to change the navbar toggle (hamburger) icon color
const customStyle = `
  .navbar-toggler-icon {
    filter: invert(1);
  }
`;

// Inject custom style into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customStyle;
document.head.appendChild(styleSheet);

export default MainNav;