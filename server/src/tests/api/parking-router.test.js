import request from 'supertest';

describe('POST /api/parking/zone', () => {
    it('Should create a parking zone and return 201', async () => {
        const response = await request(global.app)
            .post('/api/parking/zone')
            .send({
                name: 'Milton Road',
                lat: 50.9147727,
                lon: -1.4071117,
                restrictions: {
                    time_limit: 120,
                    days: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                    ],
                    start: 8,
                    end: 18,
                    no_return: '2 hours',
                },
            });

        global.ids.push(response.body._id);

        expect(response.statusCode).toBe(201);
    });
});

describe('POST /api/parking/park/:id', () => {
    it('Should return park end time', async () => {
        const response = await request(global.app).post(
            `/api/parking/park/${global.ids[0]}`
        );

        expect(response.statusCode).toBe(200);
        expect(response.body.remaining_mins).toBeDefined();
    });
});

describe('GET /api/parking', () => {
    it('Should return the end time for the current parking zone', async () => {
        const response = await request(global.app).get('/api/parking');

        expect(response.statusCode).toBe(200);
        expect(response.body.remaining_mins).toBeDefined();
    });
});

describe('PUT /api/parking/park/end', () => {
    it('Should end parking and return 200', async () => {
        const response = await request(global.app).put('/api/parking/park/end');

        expect(response.statusCode).toBe(200);
    });
});

describe('GET /api/parking', () => {
    it('Should return 404', async () => {
        const response = await request(global.app).get('/api/parking');

        expect(response.statusCode).toBe(404);
    });
});
