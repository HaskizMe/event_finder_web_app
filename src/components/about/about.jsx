import './about.css'
import discoverEventsImage from '../../assets/discoverEvents.jpeg';
import eventHostingImage from '../../assets/eventHosting.jpg';
import happyPerson2Image from '../../assets/happyPerson2.jpg';

function About() {
    return (
        <>
            <div style={{margin: 'auto', marginBottom: '200px', maxWidth: '1800px'}}>

                {/* Discover events Section */}
                <div className="section">
                    <div className="section-content" style={{ flex: 2, alignItems: "center" }}>
                        <img src={discoverEventsImage} alt="discover events" className='img'/>
                    </div>
                    <div className="section-content" style={{ flex: 3 }}>
                        <h2 style={{margin: 0}}>Discover Events Near You</h2>

                        <p>Stay in the loop with what’s happening around you! Our event management 
                            app makes it effortless to find events tailored to your interests. 
                            Use powerful filters like location, date, or category to uncover everything 
                            from concerts and festivals to networking meetups and community gatherings. 
                            With an intuitive interface and search capabilities, finding your next adventure 
                            has never been easier.</p>
                    </div>
                </div>
                <div className='divider'></div>

                {/* Host and manage events Section */}
                <div className="section">
                    <div className="section-content" style={{ flex: 3 }}>
                            <h2 style={{margin: 0}}>Host and Manage Events with Ease</h2>
                            <p>Whether you’re planning a local workshop or a large-scale festival, our app 
                                empowers you to create, edit, and share events seamlessly. Post your event 
                                details, update them as needed, or remove events with just a few clicks. Manage 
                                your events efficiently while giving others the tools to engage and RSVP effortlessly.</p>

                    </div>
                    <div className="section-content" style={{ flex: 2, alignItems: "center" }}>
                        <img src={eventHostingImage} alt="event hosting" className='img'/>
                    </div>
                </div>
                <div className='divider'></div>

                {/* Interactive features Section */}
                <div className="section">
                    <div className="section-content" style={{ flex: 2, alignItems: "center" }}>
                        <img src={happyPerson2Image} alt="happy person" className='img' />
                    </div>
                    <div className="section-content" style={{ flex: 3 }}>
                        <h2 style={{margin: 0}}>Interactive and Intuitive Features</h2>
                        <p>Enjoy a smooth, user-friendly experience with dynamic layouts and a real-time 
                            dashboard displaying upcoming events at a glance. With integrated Mapbox support, 
                            you can visualize event locations on a map, making navigation simple and fun. 
                            Powered by secure login and authentication, our platform ensures your data is 
                            safe while you focus on connecting with your community.</p>

                    </div>
                </div>

            </div>
            
        </>
    );
}

export default About;