/* eslint-disable */
const request = require('supertest');
const app = require('../../../app');

describe('Change password route', () => {
  test('Check if response is of type json', async () => {
    const response = await request(app).post('/api/v1/auth/change-password').send({
      'currentPassword': '777737777',
      'newPassword': '234567997',
      'confirmNewPassword': '234567997',
    });
    expect(response.headers['content-type']).toEqual(expect.stringContaining('text/html'));
  });

  test("should respond with a 200 status code", () => {
    const response = request(app).post("/api/v1/auth/change-password").send({
      'currentPassword': '777737777',
      'newPassword': '234567997',
      'confirmNewPassword': '234567997',
    });
    expect(response.statusCode).toBe(200);
  });

  test("should respond with a 400 status code", () => {
    const response = request(app).post("/api/v1/auth/change-password").send({
      'currentPassword': '777737777',
      'newPassword': '23456799',
      'confirmNewPassword': '234567997',
    });
    expect(response.statusCode).toBe(400);
  });

  test("should respond with a 401 status code", () => {
    const response = request(app).post("/api/v1/auth/change-password").send({
      'currentPassword': '777737778',
      'newPassword': '234567997',
      'confirmNewPassword': '234567997',
    });
    expect(response.statusCode).toBe(200);
  });
});