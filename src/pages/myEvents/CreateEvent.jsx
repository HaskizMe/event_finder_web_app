import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import "../../styles/styles.css";
import colors from '../../theme/colors';
import { AddressAutofill } from "@mapbox/search-js-react";
import events from '../../data/fakeData';

const ACCESS_TOKEN = "pk.eyJ1IjoiaGFza2l6bWUiLCJhIjoiY2x6NzRuZmVrMDVtYTJqcTh3dWJtMDJ4aSJ9.CvdjVwzUztffqsea37-RRQ"; // ✅ Replace with actual token
let i = 0;
const CreateEvent = () => {
    // const [address, setAddress] = useState("");
    // const [city, setCity] = useState("");
    const [eventData, setEventData] = useState({
        title: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        date: "",
        type: "",
        description: "",
    });

    const createEvent = (e) => {
        //setAddress("goodbye");
        //events.push(eventData);
        setEventData((prevData) => {
            const newData = {
                ...prevData,
                address: "test",
                city: "qwe",
                state: "asdf",
                zip: "123",
                country: "asda"
            };
            if (prevData.address === newData.address) {
                console.log("State not updating because address is the same.");
            } else {
                console.log("State updated successfully!");
            }
            return newData;
        });
    };

    const handleChange = (e) => {
        console.log("here");
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ Handle Address Autofill Selection (Autofill & Keep Manual Input)
    const handleAutofillRetrieve = (res) => {

        if (res.features.length > 0) {
            console.log(res);
            const place = res.features[0];
            const context = place.context || [];

            console.log("maybe here: ", place.properties.address_line1)

            setEventData((prevData) => {
                const newData = {
                    ...prevData,
                    address: place.properties.address_line1 || "", // Ensure it's a string
                    city: place.properties.address_level12 || "",
                    state: place.properties.region_code || "",
                    zip: place.properties.postcode || "",
                    country: place.properties.country || "",
                };
            
                return newData;
            });

            
        }
    };

    useEffect(() => {
        console.log("Updated Address", eventData.address, eventData.city, eventData.country, eventData.date, eventData.description, eventData.state, eventData.title, eventData.type, eventData.zip);
    }, [eventData]); 

    return (
        <MainLayout title="Create Event">
            <div className="container mt-4">
                <div className="card shadow-lg p-4 col-md-6 mx-auto">
                    <h3 className="text-center mb-4">Create an Event</h3>
                    <form onSubmit={(e) => { e.preventDefault(); console.log("Event Created:", eventData); }}>
                        
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

                        {/* ✅ Address Autofill - Typing & Autofill Work */}
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <AddressAutofill accessToken={ACCESS_TOKEN} onRetrieve={handleAutofillRetrieve}>
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
                                            // value={eventData.state}
                                            // onChange={handleChange}
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
                                            // value={eventData.zip}
                                            // onChange={handleChange}
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
                                            // value={eventData.country}
                                            // onChange={handleChange}
                                            autoComplete="country"
                                            required
                                        />
                                    </div>
                                </div>
                            </AddressAutofill>
                        </div>

                        {/* ✅ City, State, ZIP, Country Fields - Autofilled but Editable */}
                        {/* <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={eventData.city}
                                    onChange={handleChange}
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
                                    value={eventData.state}
                                    onChange={handleChange}
                                    autoComplete="address-level1"
                                    required
                                />
                            </div>
                        </div> */}

                        {/* <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">ZIP Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="zip"
                                    value={eventData.zip}
                                    onChange={handleChange}
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
                                    value={eventData.country}
                                    onChange={handleChange}
                                    autoComplete="country"
                                    required
                                />
                            </div>
                        </div> */}

                        {/* Date */}
                        <div className="mb-3">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={eventData.date}
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