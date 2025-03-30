import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import MainLayout from "../../layouts/MainLayout";
import colors from "../../theme/colors";
import { AuthContext } from "../../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [attending, setAttending] = useState(false);

  // Fetch event details from backend
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/event/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.jwt_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }

        const data = await response.json();
        setEvent(data);

        // Check if current user is already attending
        if (data.attendees?.includes(user.user_id)) {
          console.log("User is attending");
          setAttending(true);
        } else {
          console.log("User is not attending");
          //setAttending(false);
        }
      } catch (error) {
        console.error("Error loading event:", error);
      }
    };

    if (user?.jwt_token) {
      fetchEvent();
    }
  }, [id, user]);

  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/event/${id}/attend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt_token}`,
        },
        body: JSON.stringify({ attending: !attending }),
      });

      if (!response.ok) {
        throw new Error("Failed to update attendance");
      }

      setAttending((prev) => !prev);
    } catch (error) {
      console.error("Attendance toggle failed:", error);
    }
  };

  if (!event) {
    return (
      <MainLayout>
        <div style={styles.notFound}>Event not found!</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>{event.title}</h1>

          <button
            style={attending ? styles.attendingButtonActive : styles.attendingButton}
            onClick={handleClick}
          >
            {attending ? "Attending ✔" : "Attend"}
          </button>

          <div style={styles.detailsSection}>
            <p style={styles.details}>
              <strong style={styles.sectionTitle}>Start Date:</strong> {event.start_date}
            </p>
            <p style={styles.details}>
              <strong style={styles.sectionTitle}>End Date:</strong> {event.end_date}
            </p>
            <p style={styles.details}>
              <strong style={styles.sectionTitle}>Location:</strong> {event.address}
            </p>
            <p style={styles.details}>
              <strong style={styles.sectionTitle}>Type:</strong> {event.type}
            </p>
          </div>

          <div style={styles.descriptionSection}>
            <h2 style={styles.sectionTitle}>📖 Description</h2>
            <p style={styles.description}>{event.description}</p>
          </div>
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
    minHeight: "100vh",
    backgroundColor: colors.platinum,
    padding: "20px",
  },
  card: {
    backgroundColor: colors.white,
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: colors.richBlack,
    marginBottom: "10px",
  },
  attendingButton: {
    backgroundColor: colors.red,
    color: colors.white,
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
  },
  attendingButtonActive: {
    backgroundColor: colors.coolGray,
    color: colors.white,
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
  },
  detailsSection: {
    textAlign: "left",
    marginBottom: "20px",
  },
  details: {
    fontSize: "18px",
    color: colors.richBlack,
    marginBottom: "8px",
  },
  sectionTitle: {
    color: colors.red,
    fontWeight: "bold",
    fontSize: "18px",
  },
  descriptionSection: {
    textAlign: "left",
    marginTop: "20px",
  },
  description: {
    fontSize: "16px",
    color: colors.coolGray,
  },
  notFound: {
    textAlign: "center",
    fontSize: "24px",
    color: colors.red,
    fontWeight: "bold",
    marginTop: "50px",
  },
};

export default EventDetails;