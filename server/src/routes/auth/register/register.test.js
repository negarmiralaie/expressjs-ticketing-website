/* eslint-disable */
const request = require('supertest');
const app = require('../../../app');

describe('Register route', () => {
    test('Check if response is of type json', async () => {
        const response = await request(app).post('/api/v1/auth/register').send({
            'name': 'bj2w',
            'familyName': 'zzzz',
            'phoneNumber': '09891999171',
            'password': '777737777',
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    test("should respond with a 201 status code", () => {
        const response = request(app).post("/api/v1/auth/register").send({
            'name': 'bj2w',
            'familyName': 'zzzz',
            'phoneNumber': '09891999777',
            'password': '777737777',
        });
        expect(response.statusCode).toBe(201);
    });

    test("should respond with a 400 status code", () => {
        const response = request(app).post("/api/v1/auth/register").send({
            'name': '',
            'familyName': 'zzzz',
            'phoneNumber': '09891999777',
            'password': '777737777',
        });
        expect(response.statusCode).toBe(400);
    });

    test("should respond with a 400 status code", () => {
        const response = request(app).post("/api/v1/auth/register").send({
            'name': 'eeee',
            'familyName': 'zzzz',
            'phoneNumber': '0989',
            'password': '777737777',
        });
        expect(response.statusCode).toBe(400);
    });

    test("should respond with a 400 status code", () => {
        const response = request(app).post("/api/v1/auth/register").send({
            'name': 'eeee',
            'familyName': 'zzzz',
            'phoneNumber': '09891999777',
            'password': '7777',
        });
        expect(response.statusCode).toBe(400);
    });

    test("should respond with a 400 status code", () => {
        const response = request(app).post("/api/v1/auth/register").send({
            'name': 'eeee',
            'familyName': '',
            'phoneNumber': '09891999777',
            'password': '777737777',
        });
        expect(response.statusCode).toBe(400);
    });

    test("should respond with a 409 status code", () => {
        const response = request(app).post("/api/v1/auth/register").send({
            'name': 'bj2w',
            'familyName': 'zzzz',
            'phoneNumber': '09851111171',
            'password': '777737777',
        });
        expect(response.statusCode).toBe(409);
    });
});