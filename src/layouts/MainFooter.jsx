import colors from "../theme/colors"; // Import colors

const MainFooter = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        {/* Left Section: Generic Info */}
        <div style={styles.footerSection}>
          <h3 style={styles.footerTitle}>About Us</h3>
          <p>We help you find amazing events near you. Stay connected and explore new opportunities!</p>
        </div>

        {/* Middle Section: Quick Links */}
        <div style={styles.footerSection}>
          <h3 style={styles.footerTitle}>Quick Links</h3>
          <ul style={styles.footerLinks}>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/about" style={styles.link}>About</a></li>
            <li><a href="/search" style={styles.link}>Events</a></li>
          </ul>
        </div>

        {/* Right Section: Social Media */}
        <div style={styles.footerSection}>
          <h3 style={styles.footerTitle}>Follow Us</h3>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.link}>Facebook</a>
            <a href="#" style={styles.link}>Instagram</a>
            <a href="#" style={styles.link}>Twitter</a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Text */}
      <div style={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} My Website. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: colors.red, // Red background
    color: colors.white, // White text
    padding: "20px 0",
    marginTop: "30px",
  },
  footerContent: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    maxWidth: "1100px",
    margin: "0 auto",
    flexWrap: "wrap",
  },
  footerSection: {
    flex: "1",
    minWidth: "250px",
    padding: "10px",
  },
  footerTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  footerLinks: {
    listStyle: "none",
    padding: "0",
  },
  link: {
    color: colors.white,
    textDecoration: "none",
    display: "block",
    marginBottom: "5px",
  },
  socialIcons: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  footerBottom: {
    textAlign: "center",
    marginTop: "20px",
    borderTop: `1px solid ${colors.white}`,
    paddingTop: "10px",
  },
};

export default MainFooter;