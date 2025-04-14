import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import EventCard from '../../components/EventCard';
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";


const SavedEvents = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [savedEvents, setSavedEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/events`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user?.jwt_token}`,
                    },
                });

                if (!response.ok) {
                    if(response.status === 401) {
                        logout();
                    }
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
    }, [user, logout]);

    return (
      <MainLayout title="Saved Events">
  
      {/* Scrollable or fixed container based on content */}
      <div style={{ 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40px",
        paddingInline: "10px",
        ...(savedEvents.length === 0 
          ? { height: "80vh", justifyContent: "center" } 
          : { overflowY: "auto" }
        )
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
            You have no saved events
          </p>
        )}
      </div>
    </MainLayout>
      );
};

export default SavedEvents;