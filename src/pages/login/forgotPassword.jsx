import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import color from '../../theme/colors'

const ForgotPasswordForm = () => {
  return (
    <MainLayout>
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>FORGOT PASSWORD</h2>
        <input type="email" placeholder="EMAIL" style={styles.input} />
        <input type="password" placeholder="PASSWORD" style={styles.input} />
        <button style={styles.button}>RESET PASSWORD</button>
        <div style={styles.footer}>
          <Link to="/signup" style={styles.link}>SIGN UP</Link>
          <Link to="/login" style={styles.link}>LOG IN</Link>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

// Inline styles (like React Native)
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    fontSize: "22px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    color: color.richBlack,
    border: "none",
    backgroundColor: "#f1f1f1",
    fontSize: "16px",
    textAlign: "left",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: color.red, // Reddish-brown
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  link: {
    textDecoration: "none",
    color: color.red,
    fontSize: "14px",
  },
};

export default ForgotPasswordForm;