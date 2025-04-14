import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import MainLayout from "../../layouts/MainLayout";
import colors from "../../theme/colors";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const EventDetails = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [attending, setAttending] = useState(false);
  const navigate = useNavigate();

  // Fetch event details from backend
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/event/${id}`, {
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
          setAttending(true);
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
      const response = await fetch(`${API_BASE_URL}/api/event/${id}/attend`, {
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

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/event/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.jwt_token}`,
        },
      });
  
      if (!response.ok) {
        if(response.status === 401){
          logout();
        }
        throw new Error("Failed to delete event");
      }
      alert("Event deleted!");
      navigate('/search');
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Something went wrong.");
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
          {/* Delete button only if user is the event owner */}
          {event.user_id === user.user_id && (
            <button style={styles.deleteButton} onClick={handleDelete}>
              Delete Event
            </button>
          )}

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
              <strong style={styles.sectionTitle}>Location:</strong> {event.address + ", " + event.city + ", " + event.state + " " + event.zip + ", " + event.country}
            </p>
            <p style={styles.details}>
              <strong style={styles.sectionTitle}>Type:</strong> {event.type}
            </p>
          </div>

          <div style={styles.descriptionSection}>
            <h2 style={styles.sectionTitle}>Description</h2>
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

  deleteButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: colors.red,
    color: colors.white,
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  card: {
    position: "relative", // ✅ Add this line
    backgroundColor: colors.white,
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
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