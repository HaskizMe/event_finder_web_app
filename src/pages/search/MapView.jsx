import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from "react-router-dom";
import events from '../../data/fakeData';
import './MapView.css';
import '../../styles/styles.css';
import RedButton from '../../components/RedButton';
import '@fortawesome/fontawesome-free/css/all.min.css';
import colors from '../../theme/colors';
const INITIAL_CENTER = [
  -111.8910,
  40.7608  
];
const INITIAL_ZOOM = 10.12

const MapView = () => {

    const navigate = useNavigate();
    const mapRef = useRef();
    const mapContainerRef = useRef();
    const [center, setCenter] = useState(INITIAL_CENTER)
    const [zoom, setZoom] = useState(INITIAL_ZOOM)

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGFza2l6bWUiLCJhIjoiY2x6NzRuZmVrMDVtYTJqcTh3dWJtMDJ4aSJ9.CvdjVwzUztffqsea37-RRQ'
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: center,
            zoom: zoom,
            attributionControl: false,
        });
    
        // ✅ Add Markers for Each Event
        events.forEach(event => {
          // Create popup content
          const popupContent = document.createElement("div");
          popupContent.innerHTML = `<strong>${event.title}</strong><br>${event.address}<br>`;

          // Create a button instead of <a>
          const button = document.createElement("button");
          button.innerText = "View Details";
          button.style.background = colors.red;
          button.style.color = "white";
          button.style.border = "none";
          button.style.padding = "5px, 10px";
          button.style.borderRadius = "5px";
          button.style.cursor = "pointer";
          button.onclick = () => navigate(`/event/${event.id}`); // ✅ Use React Router to navigate

          popupContent.appendChild(button);

          // Add marker with popup
          new mapboxgl.Marker()
              .setLngLat([event.longitude, event.latitude])
              .setPopup(new mapboxgl.Popup().setDOMContent(popupContent)) // ✅ Use setDOMContent for event listeners
              .addTo(mapRef.current);
        });

        mapRef.current.on('move', () => {
          // get the current center coordinates and zoom level from the map
          const mapCenter = mapRef.current.getCenter()
          const mapZoom = mapRef.current.getZoom()
    
          // update state
          setCenter([ mapCenter.lng, mapCenter.lat ])
          setZoom(mapZoom)
        })

        // ✅ Try to get user's current location
        if (navigator.geolocation) {
          console.log('Geolocation available');
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const userLocation = [position.coords.longitude, position.coords.latitude];
                  console.log('User location:', userLocation);
                  mapRef.current.flyTo({center: userLocation, zoom: INITIAL_ZOOM});
                  new mapboxgl.Marker({ color: 'blue' })
                      .setLngLat(userLocation)
                      .setPopup(new mapboxgl.Popup().setHTML(`<strong>Your Location</strong>`))
                      .addTo(mapRef.current);
              },
              () => {
                  console.error("Geolocation permission denied or unavailable. Using default center.");
              }
          );
      } else {
        console.log('Geolocation not available');
      }

      // Cleanup function to remove map on unmount
      return () => {
          mapRef.current.remove();
      };
    }, [])


    const handleButtonClick = () => {

      // ✅ Try to get user's current location
      if (navigator.geolocation) {
        console.log('Geolocation available');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = [position.coords.longitude, position.coords.latitude];
                console.log('User location:', userLocation);
                mapRef.current.flyTo({center: userLocation, zoom: INITIAL_ZOOM});
            },
            () => {
                console.error("Geolocation permission denied or unavailable. Using default center.");
            }
        );
      } else {
        mapRef.current.flyTo({
          center: INITIAL_CENTER,
          zoom: INITIAL_ZOOM
        });
      }
    }

      return (
        <>
          <div style={{display: "flex", justifyContent: "center"}}>
            <div id="map-container" ref={mapContainerRef}>
              <RedButton className="reset-button" 
                  style={{
                    zIndex: 1, 
                    position: "absolute", 
                    right: '10px',
                    top: "10px",
                    fontSize: '20px'}} onClick={handleButtonClick}>
                  <i className="fas fa-map-marker-alt" style={{ padding: "1px" }}></i>
              </RedButton>

              {/* We will add to this button later*/}
              {/* <RedButton 
                  onClick={() => console.log("clicked")}
                  height="40px"
                  width="200px"
                  style={{
                      zIndex: 1, 
                      position: "absolute", 
                      bottom: "10px",
                      fontSize: '20px'
                  }}
              >
                  <span>Search Area</span>
              </RedButton> */}
            </div>
          </div>
        </>
    );
}

export default MapView;