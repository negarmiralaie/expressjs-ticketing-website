/* eslint-disable */
const request = require('supertest');
const app = require('../../../app');

describe('Verify otp route', () => {
    test('Check if response is of type json', async () => {
        const response = await request(app).post('/api/v1/auth/verify-otp').send({
            'verificationId': '62d7882a49d006d7e2e4e06e',
            'otp': '9315',
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    test("should respond with a 200 status code", () => {
        const response = request(app).post("/api/v1/auth/verify-otp").send({
            'verificationId': '62d7882a49d006d06e',
            'otp': '9315',
        });
        expect(response.statusCode).toBe(200);
    });
});