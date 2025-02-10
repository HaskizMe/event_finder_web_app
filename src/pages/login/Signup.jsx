import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { MdArrowBack } from 'react-icons/md';
import color from '../../theme/colors'

const SignUpForm = () => {
  return (
    <MainLayout>
        <div style={styles.container}>
        <div style={styles.card}>
            <Link to="/login" style={styles.backButton}><MdArrowBack /></Link>
            <h2 style={styles.title}>SIGN UP</h2>
            <input type="email" placeholder="EMAIL" style={styles.input} />
            <input type="password" placeholder="PASSWORD" style={styles.input} />
            <input type="password" placeholder="CONFIRM PASSWORD" style={styles.input} />
            <Link to='/login'>
                <button style={styles.button}>SIGN UP</button>
            </Link>
        </div>
        </div>
    </MainLayout>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: '100vh'
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "350px",
    textAlign: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: "20px",
    top: "15px",
    fontSize: "20px",
    textDecoration: "none",
    color: "black",
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
    border: "none",
    backgroundColor: "#f1f1f1",
    fontSize: "16px",
    textAlign: "left",
    color: 'black'
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: color.red,
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default SignUpForm;