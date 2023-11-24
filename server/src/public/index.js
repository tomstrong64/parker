document.addEventListener('DOMContentLoaded', () => {
    load();
    setInterval(load, 30000);

    // request notification permissions
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    // request geolocation permissions
    /* if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
        });
    } else {
        navigator.permissions.query({ name: 'geolocation' });
    } */
});

const notify = (timeRemaining) => {
    if (Notification.permission !== 'granted') {
        return;
    }

    const notification = new Notification('Parking', {
        body: `Your parking will expire in ${timeRemaining}`,
        icon: '/car.png',
    });
};

const load = async () => {
    const url = '/api/parking';
    const res = await fetch(url);
    const data = await res.json();
    document.getElementById('expiry').innerText = data.timeRemaining;
    notify(data.timeRemaining);
};
