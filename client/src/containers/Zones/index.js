import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export function Zones({ start }) {
    const [center, setCenter] = useState([50.9144001, -1.4118698]);
    const [availableZones, setAvailableZones] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            setCenter([position.coords.latitude, position.coords.longitude]);
        });

        getAvailableZones();
    }, []);

    const getAvailableZones = async () => {
        const res = await fetch('/api/parking/available');
        const data = await res.json();

        setAvailableZones(data);
    };

    const addZone = async () => {
        // TODO: Add zone to database
        /* const res = await fetch('/api/zone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Zone 4',
            }),
        });
        const data = await res.json(); */
    };

    const zoneMarkers = availableZones.map((zone) => {
        return (
            <Marker key={zone._id} position={[zone.lat, zone.lon]}>
                <Popup>
                    <h3>{zone.name}</h3>
                    <p onClick={() => start(zone._id)}>
                        Click to start parking here
                    </p>
                </Popup>
            </Marker>
        );
    });

    return (
        <div className="Content">
            <MapContainer
                center={center}
                zoom={15}
                scrollWheelZoom={false}
                className="map"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {zoneMarkers}

                <div className="buttonBanner">
                    <button onClick={addZone} className="button">
                        Add Zone
                    </button>
                </div>
            </MapContainer>
        </div>
    );
}
