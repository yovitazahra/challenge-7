const request = require('supertest')
const app = require('../../app')

describe('CAR', () => {
	test("GET LIST CARS /", async () => {
		const response = await request(app).get("/v1/cars")
		expect(response.statusCode).toBe(200)
	});
	test("GET LIST CARS QUERY AVAILABLEAT /", async () => {
		const response = await request(app).get("/v1/cars?availableAt=2023-05-28T06:09:09.919Z")
		expect(response.statusCode).toBe(200)
	});
	test("GET LIST CARS QUERY SIZE /", async () => {
		const response = await request(app).get("/v1/cars?size=small")
		expect(response.statusCode).toBe(200)
	});
	test("FIND CAR /:id", async () => {
		const response = await request(app).get("/v1/cars/1")
		expect(response.statusCode).toBe(200)
	});
})


