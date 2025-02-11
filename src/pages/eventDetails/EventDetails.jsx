import { useParams } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import colors from "../../theme/colors";

const events = [
  { id: 1, title: "Community Cleanup", location: "New York, NY", distance: "5 miles", type: "Volunteer", date: "Feb 20, 2025", description: "Join us to clean up the neighborhood!" },
  { id: 2, title: "Tech Meetup", location: "San Francisco, CA", distance: "10 miles", type: "Networking", date: "Mar 5, 2025", description: "Meet tech enthusiasts and grow your network!" },
  { id: 3, title: "Art Exhibition", location: "Chicago, IL", distance: "2 miles", type: "Culture", date: "Mar 15, 2025", description: "Explore local artwork and creativity." },
  { id: 4, title: "Music Festival", location: "Austin, TX", distance: "15 miles", type: "Entertainment", date: "Apr 10, 2025", description: "Live performances from top artists." },
];

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));
  const [attending, setAttending] = useState(false);

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
          {/* Event Title */}
          <h1 style={styles.title}>{event.title}</h1>

          {/* Attending Button */}
          <button 
            style={attending ? styles.attendingButtonActive : styles.attendingButton} 
            onClick={() => setAttending(!attending)}
          >
            {attending ? "Attending ✔" : "Attend"}
          </button>

          {/* Event Details */}
          <div style={styles.detailsSection}>
            <p style={styles.details}><strong style={styles.sectionTitle}>Date:</strong> {event.date}</p>
            <p style={styles.details}><strong style={styles.sectionTitle}>Location:</strong> {event.location}</p>
            <p style={styles.details}><strong style={styles.sectionTitle}>Distance:</strong> {event.distance}</p>
            <p style={styles.details}><strong style={styles.sectionTitle}>Type:</strong> {event.type}</p>
          </div>

          {/* Description Section */}
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