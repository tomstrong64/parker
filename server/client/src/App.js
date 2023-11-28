import { useEffect, useState } from 'react';
import './App.css';
import { CountdownTimer } from './components/CountdownTimer';

function App() {
    const [zone, setZone] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [availableZones, setAvailableZones] = useState([]);

    useEffect(() => {
        getParkingStatus();
    }, []);

    const getParkingStatus = async () => {
        const res = await fetch('/api/parking/status');
        const data = await res.json();

        if (data.zone) {
            setZone(data.zone);
            setEndTime(data.end_time);
            return;
        }

        getAvailableZones();
    };

    const getAvailableZones = async () => {
        const res = await fetch('/api/parking/available');
        const data = await res.json();

        setAvailableZones(data);
    };

    const startParking = async (id) => {
        const res = await fetch(`/api/parking/start/${id}`, {
            method: 'POST',
        });
        const data = await res.json();
        setZone(data.zone);
        setEndTime(data.end_time);
    };

    const endParking = async () => {
        const res = await fetch('/api/parking/end', {
            method: 'PUT',
        });
        const data = await res.json();

        setZone(null);
        setEndTime(null);

        getAvailableZones();
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>PARKER</h1>

                {!zone ? (
                    <ul>
                        {availableZones.map((zone) => (
                            <li key={zone._id}>
                                {zone.name}{' '}
                                <button onClick={() => startParking(zone._id)}>
                                    Start Parking
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        <h3>Parked At: {zone}</h3>
                        <CountdownTimer endTime={endTime} />
                        <button onClick={endParking}>End Parking</button>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
