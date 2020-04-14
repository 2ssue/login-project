const assert = require('assert');
const app = require('../app.js');
const request = require('supertest');

describe('회원가입 테스트', () => {
  const randomUser = `user${new Date().getTime()}`;
  const newUser = {
    userid: randomUser,
    password: 'Password123!',
    name: randomUser,
    year: 2020,
    month: 04,
    date: 13,
    gender: '여자',
    email: 'user01@user.com',
    phone: '01012345678',
    hobby: '코딩,코딩,코딩',
  };

  it('새로운 유저가 등록됨', () => {
    request(app)
      .post('/enroll')
      .set('Accept', 'application/json')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.result, 'success');
      });
  });

  it('이미 있는 유저는 등록되지 않음', () => {
    request(app)
      .post('/enroll')
      .set('Accept', 'application/json')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.result, 'fail');
      });
  });
});
