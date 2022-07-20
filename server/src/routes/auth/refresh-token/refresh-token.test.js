/* eslint-disable */
const request = require('supertest');
const app = require('../../../app');

describe('Refresh token route', () => {
  test('Check if response is of type json', async () => {
    const response = await request(app).post('/api/v1/auth/refresh-token').send({
      'refreshToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ3ODgyYTQ5ZDAwNmQ3ZTJlNGUwNzAiLCJpYXQiOjE2NTgyOTIyNjYsImV4cCI6MTY4OTg0OTg2NiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.VXrZEjfO36qN8BKwGFXBD9pu-O8Q8B7e5X3gAmWtPWk'
    });
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
  });

  test("should respond with a 200 status code", () => {
    const response = request(app).post("/api/v1/auth/refresh-token").send({
      'refreshToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ3ODgyYTQ5ZDAwNmQ3ZTJlNGUwNzAiLCJpYXQiOjE2NTgyOTIyNjYsImV4cCI6MTY4OTg0OTg2NiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.VXrZEjfO36qN8BKwGFXBD9pu-O8Q8B7e5X3gAmWtPWk'
    });
    expect(response.statusCode).toBe(200);
  });
});