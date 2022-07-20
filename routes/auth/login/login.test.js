/* eslint-disable */
const app = require("../../../app");
const request = require("supertest");

describe('Login route', () => {
    test("Check if response is of type json", async () => {
        const response = await request(app).post("/api/v1/auth/login").send({
            "phoneNumber": "09149699709",
            "password": "777737777"
        })
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });

    test("should respond with a 200 status code", () => {
        const response = request(app).post("/api/v1/auth/login").send({
            "phoneNumber": "09149699709",
            "password": "777737777"
        });
        expect(response.statusCode).toBe(200);
    });

    test("should respond with a 400 status code", () => {
        const response = request(app).post("/api/v1/auth/login").send({
            "phoneNumber": "09149",
            "password": "777737777"
        });
        expect(response.statusCode).toBe(400);
    });

    test("should respond with a 400 status code", () => {
        const response = request(app).post("/api/v1/auth/login").send({
            "phoneNumber": "09149",
            "password": "777"
        });
        expect(response.statusCode).toBe(400);
    });

    test("should respond with a 401 status code", () => {
        const response = request(app).post("/api/v1/auth/login").send({
            "phoneNumber": "09149",
            "password": "777739777"
        });
        expect(response.statusCode).toBe(401);
    });

    test("should respond with a 404 status code", () => {
        const response = request(app).post("/api/v1/auth/login").send({
            "phoneNumber": "09999999999",
            "password": "777737777"
        });
        expect(response.statusCode).toBe(404);
    });
});