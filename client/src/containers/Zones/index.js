import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export function Zones() {
    const [center, setCenter] = useState([51.505, -0.09]);

    const addZone = async () => {
        const res = await fetch('/api/zone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Zone 4',
            }),
        });
        const data = await res.json();
        console.log(data);
    };

    return (
        <div className="Content">
            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={false}
                className="map"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>

                <div className="mapUI">
                    <div className="buttonBanner">
                        <button onClick={addZone} className="button">
                            Add Zone
                        </button>
                    </div>
                </div>
            </MapContainer>
        </div>
    );
}
