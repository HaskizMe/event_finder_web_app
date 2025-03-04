import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css"

const ListView = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const [distance, setDistance] = useState("Any");
    const [eventType, setEventType] = useState("All");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const navigate = useNavigate();


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
        <>
            {/* Search and Filters */}
            <form className="search-form" onSubmit={handleSearchSubmit}>
            <input
                type="text"
                placeholder="Search for events..."
                value={searchTerm}
                onChange={handleSearchChange} // Event 1: onChange
                className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
            <button type="button" className="clear-button" onClick={handleClear}>Clear</button> {/* Event 2: onClick */}
            </form>

            <div className="filter-container">
            <input
                type="text"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="filter-input"
            />
            <select value={distance} onChange={(e) => setDistance(e.target.value)} className="filter-select">
                <option>Any</option>
                <option>5 miles</option>
                <option>10 miles</option>
                <option>25 miles</option>
                <option>50 miles</option>
                <option>100 miles</option>
            </select>
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="filter-select">
                <option>All</option>
                <option>Volunteer</option>
                <option>Networking</option>
                <option>Culture</option>
                <option>Entertainment</option>
            </select>
            </div>

            {/* Event Results */}
            <div className="event-list">
            {(filteredEvents.length > 0 ? filteredEvents : events).map((event) => (
                <div
                key={event.id}
                className="event-card"
                onClick={() => handleEventClick(event.id)} // Navigate on click
                >
                <h3 className="event-title">{event.title}</h3>
                <p className="event-details">{event.location} | {event.distance}</p>
                <p className="event-type">{event.type}</p>
                <p className="event-date">{event.date}</p>
                </div>
            ))}
            </div>
        </>
    );
};

export default ListView;