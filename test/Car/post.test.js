const request = require('supertest')
const app = require('../../app')
const {Car, UserCar} = require('../../app/models')

const idTestCar = Math.floor(Math.random() * 96) + 1;
let accessTokenAdmin
let accessTokenCustomer

beforeAll(async () => {
	const res1 = await request(app).post("/v1/auth/login").send({
		email: 'yovitazahra',
		password: '123456'
	})
	accessTokenAdmin = res1.body.accessToken

	const res2 = await request(app).post("/v1/auth/login").send({
		email: 'nana@binar.co.id',
		password: '123456'
	})
	accessTokenCustomer = res2.body.accessToken
})

afterAll(async () => {
	const lastCar = await Car.findOne({order: [['createdAt', 'DESC']]})
	await lastCar.destroy()
	const lastUserCar = await UserCar.findOne({order: [['createdAt', 'DESC']]})
	await lastUserCar.destroy()
})

describe('CAR', () => {
	test("ADD CAR /v1/cars", async () => {
		const res = await request(app).post("/v1/cars")
			.set('Authorization', `Bearer ${accessTokenAdmin}`)
			.send({
				name: 'newCar1',
				price: 400000,
				size: 'SMALL',
				image: 'https://source.unsplash.com/500x500',
			})
		expect(res.statusCode).toBe(201)
	});
	test("ADD RENT CAR /v1/cars/:id/rent", async () => {
		const response = await request(app).post(`/v1/cars/${idTestCar}/rent`)
			.set('Authorization', `Bearer ${accessTokenCustomer}`)
			.send({
				rentStartedAt: "2023-05-28T06:09:09.919Z",
				rentEndedAt: "2023-05-28T06:09:09.919Z"
			})
		expect(response.statusCode).toBe(201)
	});
	// test("ADD RENT CAR WITHOUT RENTENDEDAT /v1/cars/:id/rent", async () => {
	// 	const response = await request(app).post(`/v1/cars/${idTestCar}/rent`)
	// 		.set('Authorization', `Bearer ${accessTokenCustomer}`)
	// 		.send({
	// 			rentStartedAt: "2023-05-28T06:09:09.919Z",
	// 		})
	// 	expect(response.statusCode).toBe(201)
	// });
})

describe('CAR ERROR', () => {
	test("WRONG ADD CAR /v1/cars", async () => {
		const res = await request(app).post("/v1/cars")
			.set('Authorization', `Bearer ${accessTokenAdmin}`)
			.send({
				sembarang: 'sembarang',
				image: 'https://source.unsplash.com/500x500',
			})
		expect(res.statusCode).toBe(422)
		expect(res.body).toBeDefined()
	});
	test("ADD READY RENT CAR /v1/cars/:id/rent", async () => {
		const response = await request(app).post(`/v1/cars/${idTestCar}/rent`)
			.set('Authorization', `Bearer ${accessTokenCustomer}`)
			.send({
				rentStartedAt: "2023-05-28T06:09:09.919Z",
				rentEndedAt: "2023-05-28T06:09:09.919Z"
			})
		expect(response.statusCode).toBe(500)
	});
})

