const request = require('supertest')
const app = require('../../app')
const {Car} = require('../../app/models')

let carOriginal
let accessTokenAdmin
const idTestCar = 2

beforeAll(async () => {
	const res = await request(app).post("/v1/auth/login").send({
		email: 'yovitazahra@gmail.com',
		password: '123456'
	})
	accessTokenAdmin = res.body.accessToken
	const car = await Car.findByPk(idTestCar)
	carOriginal = car
})

afterAll(async () => {
	await Car.update({
		name: carOriginal.name,
		price: carOriginal.price,
		size: carOriginal.size,
		image: carOriginal.image,
	}, {where: {id: idTestCar}})
})

describe('CAR', () => {
	test("UPDATE CAR /v1/cars/:id", async () => {
		const res = await request(app).put(`/v1/cars/${idTestCar}`)
			.set('Authorization', `Bearer ${accessTokenAdmin}`)
			.send({
				name: 'updateCar2',
				price: 300000,
				size: 'SMALL',
				image: 'https://source.unsplash.com/500x500',
			})
		expect(res.statusCode).toBe(200)
	});
})
describe('ERROR CAR', () => {
	test("ERROR UPDATE CAR /v1/cars/:id", async () => {
		const res = await request(app).put(`/v1/cars/sembarang`)
			.set('Authorization', `Bearer ${accessTokenAdmin}`)
			.send({
				sembarang: 'sembarang',
				image: 'https://source.unsplash.com/500x500',
			})
		expect(res.statusCode).toBe(422)
		expect(res.body).toBeDefined()
	});
})
