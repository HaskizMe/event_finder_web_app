import { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from "react-router-dom";
import './MapView.css';
import '../../styles/styles.css';
import RedButton from '../../components/RedButton';
import '@fortawesome/fontawesome-free/css/all.min.css';
import colors from '../../theme/colors';
import { AuthContext } from "../../context/AuthContext";

const INITIAL_CENTER = [-111.8910, 40.7608];
const INITIAL_ZOOM = 10.12;

const MapView = () => {
  const navigate = useNavigate();
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.mapbox_token) return;

    mapboxgl.accessToken = user.mapbox_token;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
      attributionControl: false,
    });

    const fetchEventsAndPlaceMarkers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/events", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.jwt_token}`,
          },
        });

        if (!response.ok){
          if(response.status === 401){
            logout();
          } 
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        const events = data.results;

        for (const event of events) {
          const fullAddress = `${event.address}, ${event.city}, ${event.state} ${event.zip}, ${event.country}`;
          const geoResponse = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(fullAddress)}.json?access_token=${user.mapbox_token}`
          );
          const geoData = await geoResponse.json();

          if (geoData.features.length > 0) {
            const [lng, lat] = geoData.features[0].center;

            const popupContent = document.createElement("div");
            popupContent.innerHTML = `<strong>${event.title}</strong><br>${event.address}`;

            const button = document.createElement("button");
            button.innerText = "View Details";
            button.style.background = colors.red;
            button.style.color = "white";
            button.style.marginLeft = "5px";
            button.style.border = "none";
            button.style.padding = "5px 10px";
            button.style.borderRadius = "5px";
            button.style.cursor = "pointer";
            button.onclick = () => navigate(`/event/${event.id}`);

            popupContent.appendChild(button);

            new mapboxgl.Marker()
              .setLngLat([lng, lat])
              .setPopup(new mapboxgl.Popup().setDOMContent(popupContent))
              .addTo(mapRef.current);
          }
        }
      } catch (err) {
        console.error("Error loading events:", err);
      }
    };

    fetchEventsAndPlaceMarkers();

    mapRef.current.on('move', () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [position.coords.longitude, position.coords.latitude];
          mapRef.current.flyTo({ center: userLocation, zoom: INITIAL_ZOOM });
          new mapboxgl.Marker({ color: 'blue' })
            .setLngLat(userLocation)
            .setPopup(new mapboxgl.Popup().setHTML(`<strong>Your Location</strong>`))
            .addTo(mapRef.current);
        },
        () => {
          console.error("Geolocation permission denied");
        }
      );
    }

    return () => {
      mapRef.current.remove();
    };
  }, [user]);

  const handleButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [position.coords.longitude, position.coords.latitude];
          mapRef.current.flyTo({ center: userLocation, zoom: INITIAL_ZOOM });
        },
        () => {
          mapRef.current.flyTo({ center: INITIAL_CENTER, zoom: INITIAL_ZOOM });
        }
      );
    } else {
      mapRef.current.flyTo({ center: INITIAL_CENTER, zoom: INITIAL_ZOOM });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div id="map-container" ref={mapContainerRef}>
        <RedButton
          className="reset-button"
          style={{
            zIndex: 1,
            position: "absolute",
            right: '10px',
            top: "10px",
            fontSize: '20px'
          }}
          onClick={handleButtonClick}
        >
          <i className="fas fa-map-marker-alt" style={{ padding: "1px" }}></i>
        </RedButton>
      </div>
    </div>
  );
};

export default MapView;