const request = require('supertest');
const app = require('./../app');

let server;

beforeAll(async () => {
  server = await app.listen(3001); 
});

afterAll(async () => {
  if (server) {
    await server.close();
  }
});

describe('Profile CRUD Operations', () => {
    let profileID;
    it('should create a new profile', async () => {
        const res = await request(app)
            .post('/api/profiles')
            .send({
                "name": "Nalin",
                "description": "First Profile",
                "mbti": "ISFJ",
                "enneagram": "9w3",
                "variant": "sp/so",
                "tritype": 1,
                "socionics": "h",
                "sloan": "RCOEN",
                "psyche": "evil",
                "image": "https://soulverse.boo.world/images/1.png"
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Nalin');
        profileID = res.body._id;
    });
    it('should fetch the created profile', async () => {
        const res = await request(app)
            .get(`/api/profiles/${profileID}`)
            .send({});
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Nalin');
    });
});

