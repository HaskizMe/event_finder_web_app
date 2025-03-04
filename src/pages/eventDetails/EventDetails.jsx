import { useParams } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import colors from "../../theme/colors";
import events from "../../data/fakeData";

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));
  const [attending, setAttending] = useState(event.attending);

  function handleClick(attendingStatus){
    console.log(event.id);
    event.attending = !event.attending; // ✅ Update event object directly
    setAttending(attendingStatus);
    console.log(events);
  }

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
            onClick={() => handleClick(!attending)}
          >
            {attending ? "Attending ✔" : "Attend"}
          </button>

          {/* Event Details */}
          <div style={styles.detailsSection}>
            <p style={styles.details}><strong style={styles.sectionTitle}>Date:</strong> {event.date}</p>
            <p style={styles.details}><strong style={styles.sectionTitle}>Location:</strong> {event.address}</p>
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