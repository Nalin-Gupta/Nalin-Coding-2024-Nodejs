const app = require('./app'); // Import your Express application
let server;

beforeAll(async () => {
    if (!server) {
        server = await app.listen(3002); // Start the app on port 3000
    }
});

afterAll(async () => {
    if (server) {
        await server.close();
        server = null;
    }
});
