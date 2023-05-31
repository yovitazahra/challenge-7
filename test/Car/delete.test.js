const request = require('supertest')
const app = require('../../app')

const idTestCar = Math.floor(Math.random() * 96) + 1;
let accessTokenAdmin
let accessTokenCustomer

beforeAll(async () => {
	const res1 = await request(app).post("/v1/auth/login").send({
		email: 'yovitazahra@gmail.com',
		password: '123456'
	})
	accessTokenAdmin = res1.body.accessToken

	const res2 = await request(app).post("/v1/auth/login").send({
		email: 'nana@binar.co.id',
		password: '123456'
	})
	accessTokenCustomer = res2.body.accessToken
})

describe('CAR', () => {
	test("DELETE CAR /v1/cars/:id", async () => {
		const res = await request(app).delete(`/v1/cars/${idTestCar}`)
			.set('Authorization', `Bearer ${accessTokenAdmin}`)
		expect(res.statusCode).toBe(204)
	});
})

describe('CAR ERROR', () => {
	test("INSUFFICIENT ACCESS /v1/cars/:id", async () => {
		const res = await request(app).delete(`/v1/cars/${idTestCar}`)
			.set('Authorization', `Bearer ${accessTokenCustomer}`)
		expect(res.body).toBeDefined()
	});
})
