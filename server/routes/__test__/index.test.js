const request = require('supertest');
const ObjectId = require('mongodb').ObjectID;
const app = require('../../app');

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
// !!!!!!!!!!
// !!!!!!!!!!
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

describe('User Operations', () => {  // eslint-disable-line
  it('Get /tickets --> array tickets', () => { // eslint-disable-line
    request(app)
      .get('/api/v1/user/get-user-tickets')
    // .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual( // eslint-disable-line
          expect.objectContaining({ // eslint-disable-line
            data: expect.objectContaining({ // eslint-disable-line
              arr: expect.arrayContaining([ // eslint-disable-line
                expect.arrayContaining([ // eslint-disable-line
                  expect.objectContaining({ // eslint-disable-line
                    _id: expect.any(String), // eslint-disable-line
                    title: expect.any(String), // eslint-disable-line
                    description: expect.any(String), // eslint-disable-line
                    status: expect.any(String), // eslint-disable-line
                    date: expect.any(Date), // eslint-disable-line
                    requestType: expect.any(String), // eslint-disable-line
                    user: expect.any(ObjectId), // eslint-disable-line
                  }),
                ]),
              ]),
            }),
            message: expect.any(String), // eslint-disable-line
          }),
        );
      });
  });
});
