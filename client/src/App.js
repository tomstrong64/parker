import './App.css';

import { Home } from './containers/Timer';
import { Zones } from './containers/Zones';

function App() {
    return (
        <div className="App">
            <header className="Header">
                <h1>PARKER</h1>
            </header>
            <Zones />
            <footer className="Footer"></footer>
        </div>
    );
}

export default App;
