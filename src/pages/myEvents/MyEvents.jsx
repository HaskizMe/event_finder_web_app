import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import EventCard from '../../components/EventCard';
import { AuthContext } from "../../context/AuthContext";

const MyEvents = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [savedEvents, setSavedEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/events", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user?.jwt_token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data = await response.json();

                const myEvents = data.results.filter(event =>
                    event.attendees?.includes(user.user_id)
                );

                setSavedEvents(myEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        if (user?.jwt_token && user?.user_id) {
            fetchEvents();
        }
    }, [user]);

    return (
        <MainLayout title="My Events">
            <div style={{ 
                display: "flex", 
                flexDirection: "column",
                marginTop: '20px',
                marginBottom: '20px',
                alignItems: "center", 
                justifyContent: savedEvents.length === 0 ? "center" : "flex-start", 
                height: "80vh"
            }}>
                {savedEvents.length > 0 ? (
                    savedEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            onClick={() => navigate(`/event/${event.id}`)}
                            event={event}
                        />
                    ))
                ) : (
                    <p style={{ fontSize: "20px", color: "gray", fontWeight: "bold" }}>
                        No saved events
                    </p>
                )}
            </div>
        </MainLayout>
    );
};

export default MyEvents;