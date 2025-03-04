import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapView = () => {
    const mapRef = useRef();
    const mapContainerRef = useRef();

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGFza2l6bWUiLCJhIjoiY2x6NzRuZmVrMDVtYTJqcTh3dWJtMDJ4aSJ9.CvdjVwzUztffqsea37-RRQ'
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [-74.0242, 40.6941],
            zoom: 10.12,
            attributionControl: false,
          });
    
        return () => {
          mapRef.current.remove()
        }
      }, [])

      return (
        <div style={{
            width: "80%",
            height: "600px",
            backgroundColor: "grey",
            margin: "50px auto 100px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center" // ✅ Centers the content vertically
        }}>
            <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }}></div> {/* ✅ Ensures the map fills the container */}
        </div>
    );
}

export default MapView;