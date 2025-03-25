import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css"
import events from '../../data/fakeData'
import EventCard from "../../components/EventCard";

const ListView = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const [distance, setDistance] = useState("Any");
    const [eventType, setEventType] = useState("All");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const navigate = useNavigate();

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
        (location === "" || events.location.includes(location)) &&
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

                <EventCard
                    key={event.id}
                    onClick={handleEventClick} // ✅ Pass function reference
                    event={event} // ✅ Pass event object
                />
            ))}
            </div>
        </>
    );
};

export default ListView;