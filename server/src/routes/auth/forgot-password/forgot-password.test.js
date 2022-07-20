/* eslint-disable */
const request = require('supertest');
const app = require('../../../app');

describe('Forgot password route', () => {
  test('Check if response is of type json', async () => {
    const response = await request(app).post('/api/v1/auth/forgot-password').send({
      'phoneNumber': '09149699709',
    });
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
  });

  test("should respond with a 200 status code", () => {
    const response = request(app).post("/api/v1/auth/forgot-password").send({
      'phoneNumber': '09149699709',
    });
    expect(response.statusCode).toBe(200);
  });

  test("should respond with a 400 status code", () => {
    const response = request(app).post("/api/v1/auth/forgot-password").send({
      'phoneNumber': '0914',
    });
    expect(response.statusCode).toBe(400);
  });
});