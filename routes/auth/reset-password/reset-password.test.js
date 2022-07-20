/* eslint-disable */
const request = require('supertest');
const app = require('../../../app');

describe('Reset Password route', () => {
    test("Check if response is of type json", async () => {
        const response = await request(app).post('/api/v1/auth/reset-password').send({
            'password': '2345678999',
            'confirmPassword': '2345678999',
        })
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    });

    test("should respond with a 200 status code", () => {
        const response = request(app).post("/api/v1/auth/reset-password").send({
            'password': '2345678999',
            'confirmPassword': '2345678999',
        });
        expect(response.statusCode).toBe(200);
    });

    test("should respond with a 400 status code", () => {
        const response = request(app).post("/api/v1/auth/reset-password").send({
            'password': '23456',
            'confirmPassword': '2345678999',
        });
        expect(response.statusCode).toBe(400);
    });

    test("should respond with a 400 status code", () => {
        const response = request(app).post("/api/v1/auth/reset-password").send({
            'password': '2345678999',
            'confirmPassword': '23456',
        });
        expect(response.statusCode).toBe(400);
    });

    test("should respond with a 200 status code", () => {
        const response = request(app).post("/api/v1/auth/reset-password").send({
            'password': '2345678999',
            'confirmPassword': '2345678990',
        });
        expect(response.statusCode).toBe(200);
    });
});