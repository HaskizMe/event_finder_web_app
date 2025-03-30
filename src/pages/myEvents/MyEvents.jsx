import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import EventCard from '../../components/EventCard';
import { AuthContext } from "../../context/AuthContext";
import RedButton from '../../components/RedButton';


const MyEvents = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [myEvents, setMyEvents] = useState([]);

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
                    if(response.status === 401) {
                        logout();
                    }
                    throw new Error("Failed to fetch events");
                }
                const data = await response.json();

                const myEvents = data.results.filter(event =>
                    event.user_id === user.user_id
                );

                setMyEvents(myEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        if (user?.jwt_token && user?.user_id) {
            fetchEvents();
        }
    }, [user, logout]);

    return (
        <MainLayout title="My Events">
          <div style={{ display: "flex", justifyContent: "right", margin: "20px 50px" }}>
            <RedButton
              width={"200px"}
              height={"50px"}
              onClick={() => navigate("/create-event")}
            >
              Create Event <i className="fas fa-calendar-plus" style={{ paddingLeft: "5px" }}></i>
            </RedButton>
          </div>
      
          {/* Scrollable or fixed container based on content */}
          <div style={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingInline: "10px",
            ...(myEvents.length === 0 
              ? { height: "80vh", justifyContent: "center" } 
              : { overflowY: "auto" }
            )
          }}>
            {myEvents.length > 0 ? (
              myEvents.map((event) => (
                <EventCard
                  key={event.id}
                  onClick={() => navigate(`/event/${event.id}`)}
                  event={event}
                />
              ))
            ) : (
              <p style={{ fontSize: "20px", color: "gray", fontWeight: "bold" }}>
                You have no created events
              </p>
            )}
          </div>
        </MainLayout>
      );
};

export default MyEvents;