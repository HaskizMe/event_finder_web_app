import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import events from '../../data/fakeData';
import EventCard from '../../components/EventCard';
import RedButton from '../../components/RedButton';

const MyEvents = () => {
    const navigate = useNavigate();
    const savedEvents = events.filter((e) => e.attending);


    return (
        <MainLayout title="My Events">

            <div style={{display: "flex", justifyContent: "right", margin: "20px 50px"}}>
                <RedButton
                    width={"200px"}
                    height={"50px"}
                    onClick={() => navigate("/create-event")}
                >
                    Create Event <i className="fas fa-calendar-plus" style={{ paddingLeft: "5px" }}></i></RedButton>
            </div>
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