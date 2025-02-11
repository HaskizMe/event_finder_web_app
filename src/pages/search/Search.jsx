import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import MainLayout from "../../layouts/MainLayout";
import colors from "../../theme/colors"; // Import colors

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("Any");
  const [eventType, setEventType] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate(); // Hook for navigation


  const events = [
    { id: 1, title: "Community Cleanup", location: "New York, NY", distance: "5 miles", type: "Volunteer", date: "Feb 20, 2025" },
    { id: 2, title: "Tech Meetup", location: "San Francisco, CA", distance: "10 miles", type: "Networking", date: "Mar 5, 2025" },
    { id: 3, title: "Art Exhibition", location: "Chicago, IL", distance: "2 miles", type: "Culture", date: "Mar 15, 2025" },
    { id: 4, title: "Music Festival", location: "Austin, TX", distance: "15 miles", type: "Entertainment", date: "Apr 10, 2025" },
  ];

  // **React Event: onChange - Handles search input updates**
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // **React Event: onClick - Clears search & filters**
  const handleClear = () => {
    setSearchTerm("");
    setLocation("");
    setDistance("Any");
    setEventType("All");
    setFilteredEvents([]); // Reset filtered events
  };

  // **React Event: onSubmit - Handles form submission**
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (location === "" || event.location.includes(location)) &&
      (distance === "Any" || event.distance === distance) &&
      (eventType === "All" || event.type === eventType)
    );
    setFilteredEvents(filtered);
  };

    // **React Event: Navigate to event details page**
    const handleEventClick = (eventId) => {
        navigate(`/event/${eventId}`); // Redirects to event details page
      };

  return (
    <MainLayout>
      <div style={styles.container}>
        <h2 style={styles.heading}>Search for Events</h2>

        {/* Search and Filters */}
        <form style={styles.searchForm} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for events..."
            value={searchTerm}
            onChange={handleSearchChange} // Event 1: onChange
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>Search</button>
          <button type="button" style={styles.clearButton} onClick={handleClear}>Clear</button> {/* Event 2: onClick */}
        </form>

        <div style={styles.filterContainer}>
          <input
            type="text"
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.filterInput}
          />
          <select value={distance} onChange={(e) => setDistance(e.target.value)} style={styles.filterSelect}>
            <option>Any</option>
            <option>5 miles</option>
            <option>10 miles</option>
            <option>25 miles</option>
            <option>50 miles</option>
            <option>100 miles</option>
          </select>
          <select value={eventType} onChange={(e) => setEventType(e.target.value)} style={styles.filterSelect}>
            <option>All</option>
            <option>Volunteer</option>
            <option>Networking</option>
            <option>Culture</option>
            <option>Entertainment</option>
          </select>
        </div>

        {/* Event Results */}
        <div style={styles.eventList}>
          {(filteredEvents.length > 0 ? filteredEvents : events).map((event) => (
            <div
              key={event.id}
              style={styles.eventCard}
              onClick={() => handleEventClick(event.id)} // Navigate on click
            >
              <h3 style={styles.eventTitle}>{event.title}</h3>
              <p style={styles.eventDetails}>{event.location} | {event.distance}</p>
              <p style={styles.eventType}>{event.type}</p>
              <p style={styles.eventDate}>{event.date}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

const styles = {
  container: {
    padding: "30px",
    backgroundColor: colors.platinum,
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    color: colors.richBlack,
    marginBottom: "20px",
  },
  searchForm: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  searchInput: {
    width: "50%",
    padding: "12px",
    borderRadius: "8px",
    color: colors.richBlack,
    backgroundColor: colors.white,
    border: `1px solid ${colors.red}`,
    fontSize: "16px",
  },
  searchButton: {
    backgroundColor: colors.red,
    color: colors.white,
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  clearButton: {
    backgroundColor: colors.coolGray,
    color: colors.white,
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  filterInput: {
    padding: "10px",
    borderRadius: "6px",
    color: colors.richBlack,
    border: `1px solid ${colors.coolGray}`,
    fontSize: "14px",
    width: "200px",
    backgroundColor: colors.white,
  },
  filterSelect: {
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: colors.white,
    color: colors.richBlack,
    border: `1px solid ${colors.coolGray}`,
    fontSize: "14px",
    width: "150px",
  },
  eventList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  eventCard: {
    backgroundColor: colors.white,
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "50%",
    marginBottom: "15px",
    cursor: "pointer"
  },
  eventTitle: {
    fontSize: "20px",
    color: colors.red,
    marginBottom: "5px",
  },
  eventDetails: {
    color: colors.richBlack,
    fontSize: "14px",
  },
  eventType: {
    fontSize: "14px",
    color: colors.coolGray,
  },
  eventDate: {
    fontSize: "14px",
    fontWeight: "bold",
    color: colors.richBlack,
  },
};

export default Search;