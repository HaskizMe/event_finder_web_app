/* eslint-disable react/prop-types */
import '../styles/styles.css';

const EventCard = ({ onClick, event }) => {
    return (
        <div
            className="event-card"
            onClick={() => onClick(event.id)}
        >
            <h3 className="event-title">{event.title}</h3>
            <p className="event-details">{event.address}</p>
            <p className="event-type">{event.type}</p>
            <p className="event-date">{event.date}</p>
        </div>
    );
};

export default EventCard;