const request = require('supertest');
const app = require('./../app');

let profileA;
let profileB;
let commentA;
let commentID;

beforeAll(async () => {
    const createProfile = async (name, description, image = '') => {
        const createResponse = await request(app).post("/api/Profiles").send({
            name,
            description,
            mbti: "ISFJ",
            enneagram: "9w3",
            variant: "sp/so",
            tritype: 1,
            socionics: "h",
            sloan: "RCOEN",
            psyche: "evil",
            image,
        });
        return createResponse.body;
    };

    profileA = await createProfile("Nalin", "First Profile", "https://soulverse.boo.world/images/1.png");
    profileB = await createProfile("ram", "Second Profile");
});

describe("POST /comments", () => {
    it("should create a new comment", async () => {
        const response = await request(app).post("/api/comments").send({
            name: profileA.name,
            text: "test comment 1",
            profileName: profileB.name,
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.text).toBe("test comment 1");
        commentID = response.body._id;
    });

    it("should get the created comment", async () => {
        const response = await request(app).get(`/api/comments/profile/${profileB.name}`);
        expect(response.status).toBe(200);
        expect(response.body[0]._id).toBe(commentID);
        expect(response.body[0].text).toBe("test comment 1");
    });

    it('should return 404 if target profile not found when creating comment', async () => {
        const response = await request(app)
            .post('/api/comments')
            .send({
                name: profileA.name,
                profileName: 'Nonexistent Profile',
                text: 'This comment should not be created'
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Target profile not found');
    });

    it('should return 404 if Author Profile not found when creating comment', async () => {
        const response = await request(app)
            .post('/api/comments')
            .send({
                name: "Random Name",
                profileName: profileB.name,
                text: "Should not be created"
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Author profile not found');
    });
});

describe('GET /comments/profile/:id ', () => {
    beforeAll(async () => {
        const createComment = async (name, text, profileName) => {
            const response = await request(app).post("/api/comments").send({ name, text, profileName });
            return response.body;
        };

        commentA = await createComment(profileA.name, "test comment 1", profileB.name);

        await request(app).patch(`/api/comments/${commentA._id}/like`).send({ profileName: profileA.name });
        await request(app).patch(`/api/comments/${commentA._id}/like`).send({ profileName: profileB.name });
    });

    it('should fetch comments sorted by likes', async () => {
        const response = await request(app).get(`/api/comments/profile/${profileB.name}?sortBy=likes`);

        expect(response.status).toBe(200);
        expect(response.body[0].likeCount).toBeGreaterThanOrEqual(response.body[1].likeCount);
    });

    it('should fetch comments sorted by creation date', async () => {
        const response = await request(app).get(`/api/comments/profile/${profileB.name}?sortBy=createdAt`);

        expect(response.status).toBe(200);
        const createdAt1 = new Date(response.body[0].createdAt);
        const createdAt2 = new Date(response.body[1].createdAt);
        expect(createdAt1.getTime()).toBeGreaterThanOrEqual(createdAt2.getTime());
    });
    it('should default to sort by creation date if sortBy is invalid', async () => {
        const response = await request(app).get(`/api/comments/profile/${profileB.name}?sortBy=invalidSort`);

        expect(response.status).toBe(200);
        const createdAt1 = new Date(response.body[0].createdAt);
        const createdAt2 = new Date(response.body[1].createdAt);
        expect(createdAt1.getTime()).toBeGreaterThanOrEqual(createdAt2.getTime());
    });

    it('should default to sort by creation date if sortBy query parameter is missing', async () => {
        const response = await request(app).get(`/api/comments/profile/${profileB.name}`);
    
        const createdAt1 = new Date(response.body[0].createdAt);
        const createdAt2 = new Date(response.body[1].createdAt);
        expect(createdAt1.getTime()).toBeGreaterThanOrEqual(createdAt2.getTime());
    });

    it('should return empty array if no comments for profile', async () => {
        const response = await request(app).get(`/api/comments/profile/${profileA.name}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should return 404 if profile name contains invalid characters', async () => {
        const response = await request(app).get(`/api/comments/profile/Nonexistent Profile`);
    
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Profile not found');
    });
    
});

describe('PATCH /comments/:id/like ', () => {
    beforeAll(async () => {
        const createComment = async (name, text, profileName) => {
            const response = await request(app).post("/api/comments").send({ name, text, profileName });
            return response.body;
        };

        commentA = await createComment(profileA.name, "test comment 1", profileB.name);

    });

    it('likeCount should increase when a user likes', async () => {
        const response = await request(app).patch(`/api/comments/${commentA._id}/like`).send({ profileName: profileA.name });

        expect(response.status).toBe(200);
        expect(response.body.likeCount).toEqual(1);
    });
    it('likeCount should decrease when the same user likes on the same comment', async () => {
        const response = await request(app).patch(`/api/comments/${commentA._id}/like`).send({ profileName: profileA.name });

        expect(response.status).toBe(200);
        expect(response.body.likeCount).toEqual(0);
    });
    
});


