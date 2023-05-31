const request = require('supertest')
const app = require('../../app')

describe('AUTH', () => {
	test("LOGIN /v1/auth/login", async () => {
		const res = await request(app).post("/v1/auth/login").send({
			email: 'yovitazahra@gmail.com',
			password: '123456'
		})
		expect(res.statusCode).toBe(201)
	});
})

describe('ERROR AUTH', () => {
	test("LOGIN EMAIL NOT REGISTERED /v1/auth/login", async () => {
		const res = await request(app).post("/v1/auth/login").send({
			email: 'sembarang@binar.co.id',
			password: '123456'
		})
		expect(res.statusCode).toBe(404)
	});
	test("LOGIN WRONG PASSWORD /v1/auth/login", async () => {
		const res = await request(app).post("/v1/auth/login").send({
			email: 'yovitazahra@gmail.com',
			password: 'sembarang'
		})
		expect(res.statusCode).toBe(401)
		expect(res.body).toBeDefined()
	});
})
