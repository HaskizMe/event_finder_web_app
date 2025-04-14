import { useState, useContext } from "react";
import MainLayout from "../../layouts/MainLayout";
import "../../styles/styles.css";
import colors from '../../theme/colors';
import { AddressAutofill } from "@mapbox/search-js-react";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const CreateEvent = () => {
    const { user, logout } = useContext(AuthContext); // Get user state & logout function
    // const [address, setAddress] = useState("");
    // const [city, setCity] = useState("");
    const initialEventData = {
        title: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        start_date: "",
        type: "",
        description: "",
      };
    const [eventData, setEventData] = useState(initialEventData);

    const createEvent = async (e) => {
        e.preventDefault();
    
        // Define the required fields in the order you want to validate
        const requiredFields = [
            { key: "title", label: "Title" },
            { key: "address", label: "Address" },
            { key: "city", label: "City" },
            { key: "state", label: "State" },
            { key: "zip", label: "ZIP Code" },
            { key: "country", label: "Country" },
            { key: "start_date", label: "Date" },
            { key: "type", label: "Type" }
        ];
    
        for (const field of requiredFields) {
            if (!eventData[field.key] || eventData[field.key].trim() === "") {
                alert(`${field.label} is required.`);
                return;
            }
        }
    
        try {
            const response = await fetch(`${API_BASE_URL}/api/event`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.jwt_token}`,
                },
                body: JSON.stringify(eventData),
            });
    
            if (!response.ok) {
                if (response.status === 401) {
                    logout();
                }
                const error = await response.json();
                console.error("Error creating event:", error);
                alert("Failed to create event.");
                return;
            }
    
            alert("Event created successfully!");
            setEventData(initialEventData); // reset form
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("Something went wrong.");
        }
    };

    const handleChange = (e) => {
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Address Autofill Selection (Autofill & Keep Manual Input)
    const handleAutofillRetrieve = (res) => {

        if (res.features.length > 0) {
            const place = res.features[0];
            setEventData((prevData) => {
                const newData = {
                    ...prevData,
                    address: place.properties.address_line1 || "",
                    city: place.properties.address_level2 || "",
                    state: place.properties.region_code || "",
                    zip: place.properties.postcode || "",
                    country: place.properties.country || "",
                };
            
                return newData;
            });

            
        }
    };

    return (
        <MainLayout title="Create Event">
            <div className="container mt-4">
                <div className="card shadow-lg p-4 col-md-6 mx-auto">
                    <h3 className="text-center mb-4">Create an Event</h3>
                    <form onSubmit={(e) => { createEvent(e) }}>
                        
                        {/* Event Title */}
                        <div className="mb-3">
                            <label className="form-label">Event Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={eventData.title}
                                onChange={handleChange}
                                placeholder="Enter event title"
                                required
                            />
                        </div>

                        {/* Address Autofill - Typing & Autofill Work */}
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <AddressAutofill accessToken={user.mapbox_token} onRetrieve={handleAutofillRetrieve}>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address-search"
                                    placeholder="Start typing an address..."
                                    autoComplete="address-line1"
                                    required
                                />

                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            // value={eventData.city}
                                            // onChange={handleChange}
                                            autoComplete="address-level2"
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="form-label">State</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="state"
                                            autoComplete="address-level1"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label">ZIP Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="zip"
                                            autoComplete="postal-code"
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Country</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="country"
                                            autoComplete="country"
                                            required
                                        />
                                    </div>
                                </div>
                            </AddressAutofill>
                        </div>

                        {/* Date */}
                        <div className="mb-3">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="start_date"
                                value={eventData.start_date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Event Type */}
                        <div className="mb-3">
                            <label className="form-label">Event Type</label>
                            <select
                                className="form-select"
                                name="type"
                                value={eventData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select an event type</option>
                                <option value="Concert">Concert</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Festival">Festival</option>
                                <option value="Sports">Sports</option>
                                <option value="Volunteer">Volunteer</option>
                                <option value="Networking">Networking</option>
                                <option value="Meetup">Meetup</option>
                                <option value="Fundraiser">Fundraiser</option>
                                <option value="Conference">Conference</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Webinar">Webinar</option>
                                <option value="Party">Party</option>
                                <option value="Ceremony">Ceremony</option>
                                <option value="Class">Class</option>
                                <option value="Open House">Open House</option>
                                <option value="Competition">Competition</option>
                                <option value="Tour">Tour</option>
                                <option value="Exhibition">Exhibition</option>
                                <option value="Game Night">Game Night</option>
                                <option value="Movie Night">Movie Night</option>
                                <option value="Religious">Religious</option>
                                <option value="Community">Community</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={eventData.description}
                                onChange={handleChange}
                                placeholder="Enter event description"
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn w-100" onClick={createEvent} style={{ backgroundColor: colors.red, color: colors.white }}>
                            Create Event
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default CreateEvent;