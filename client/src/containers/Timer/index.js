import { CountdownTimer } from '../../components/CountdownTimer';

export function Timer({ parking }) {
    return (
        <div>
            <h3>Parked At: {parking.zone}</h3>
            <CountdownTimer endTime={parking.end_time} />
            <button onClick={parking.end}>End Parking</button>
        </div>
    );
}
