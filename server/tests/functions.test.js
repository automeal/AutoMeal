const request = require('supertest');
const { app, mongoose } = require('../app');
const User = require('../models/User');

beforeAll(() => {
  User.remove({}, err => {
    if (err) throw err;
  });
});

afterAll(done => {
  mongoose.disconnect(done);
});

describe('Login nonexistent user', () => {
  test('It should respond with 404 (does not exist)', done => {
    request(app)
      .post('/api/users/login')
      .send({
        email: 'thugLife@mapGang.com',
        password: 'dora.newiestPassword'
      })
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe('Register user', () => {
  test('It should respond with 200 (success)', done => {
    request(app)
      .post('/api/users/register')
      .send({
        fullName: 'daniel segarra',
        email: 'daniel@email.com',
        password: 'password',
        confirm_password: 'password'
      })
      .set('Content-Type', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('Login just created user', () => {
  test('It should respond with 200 (success)', done => {
    request(app)
      .post('/api/users/login')
      .send({
        email: 'daniel@email.com',
        password: 'password'
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
