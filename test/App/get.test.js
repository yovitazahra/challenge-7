const request = require('supertest')
const app = require('../../app')

describe('App', () => {
	test('OK /', async () => {
		const response = await request(app).get("/")
		expect(response.status).toBe(200)
		expect(response.body).toEqual({
			status: "OK",
			message: "BCR API is up and running!",
		});
	})

	test("not found", async () => {
		const response = await request(app).get("/sembarang");
		expect(response.status).toBe(404);
		expect(response.body).toEqual({
			error: {
				name: expect.any(String),
				message: expect.any(String),
				details: {
					method: expect.any(String),
					url: expect.any(String)
				}
			}
		});
	});
})