import { useCountdown } from '../hooks/useCountdown';

export function CountdownTimer({ endTime }) {
    const [days, hours, minutes, seconds] = useCountdown(endTime);

    if (days === 0 && hours === 0 && minutes === 0) {
        return <h3>Parking Expired!</h3>;
    }

    return (
        <div>
            <h4>Time Remaining</h4>
            <p>
                {!days ? null : <span>{days} days,</span>}
                {!hours ? null : <span>{hours} hours,</span>}
                {!minutes ? null : <span>{minutes} minutes</span>}
            </p>
        </div>
    );
}
