const app = require("../../app");
const request = require("supertest");
const ObjectId = require('mongodb').ObjectID;

// describe('register api', () => {

    // describe('given a username and a password', () => {
    //     // should save the username and password in the DB
    //     // should respond with a json object containing the userId
    //     test("should respond with a 200 status code", () => {
    //         const response = await request(app).post("/register").send({
    //             username: "username",
    //             password: "password"
    //         })
    //         expect(response.statusCode).toBe(200)
    //     })
    //     // should specify json in the content type header
    // })



    // test for the happy case
    // it('returns status code 201 if firstName is passed', async () => {
    //     const req = { params: { firstName: 'Bob' } };
    //     const res = await (await request(app).post('register')).send({firstName: 'Jan'});
        
    //     expect(res.statusCode).toEqual(201);
    // });

    // // test for the bad case
    // it('returns bad request if firstName is missing', async () => {
    //     const res = await (await request(app).post('register')).send({});
        
    //     expect(res.statusCode).toEqual(400);
    //     // expect(res.body).toEqual({'you nedd to....'});
    // });
// });

describe('User Operations', () => {
    it('Get /tickets --> array tickets', () => {
        return request(app)
            .get('/api/v1/user/get-user-tickets')
            // .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                            data: expect.objectContaining({
                                arr: expect.arrayContaining([
                                    expect.arrayContaining([
                                        expect.objectContaining({
                                            _id: expect.any(String),
                                            title: expect.any(String),
                                            description: expect.any(String),
                                            status: expect.any(String),
                                            date: expect.any(Date),
                                            requestType: expect.any(String),
                                            user: expect.any(ObjectId)
                                        })
                                    ])
                                ])
                            }),
                            message: expect.any(String)
                    }))
            })
    })
});