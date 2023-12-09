import './App.css';

import { useEffect, useState } from 'react';

import { Login } from './containers/Login';
import { Timer } from './containers/Timer';
import { Zones } from './containers/Zones';

import { useAuth } from './context/AuthContext';

function App() {
    const [parking, setParking] = useState(null);
    const { user, logout } = useAuth();

    useEffect(() => {
        getParkingStatus();
    });

    const getParkingStatus = async () => {
        const res = await fetch('/api/parking/status');

        if (res.status === 404) return setParking(null);

        let data = await res.json();

        data.end = () => {
            endParking();
        };

        setParking(data);
    };

    const startParking = async (id) => {
        const res = await fetch(`/api/parking/start/${id}`, {
            method: 'POST',
        });
        const data = await res.json();

        data.end = () => {
            endParking();
        };

        setParking(data);
    };

    const endParking = async () => {
        const res = await fetch('/api/parking/end', {
            method: 'PUT',
        });
        if (res.status !== 200) return alert('Error ending parking');
        setParking(null);
    };

    return (
        <div className="App">
            <header className="Header">
                <h1>PARKER</h1>
                {user ? <button onClick={logout}>Logout</button> : null}
            </header>
            {user ? (
                parking ? (
                    <Timer parking={parking} />
                ) : (
                    <Zones start={startParking} />
                )
            ) : (
                <Login />
            )}
            <footer className="Footer"></footer>
        </div>
    );
}

export default App;
