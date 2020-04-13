const assert = require('assert');
const app = require('../app.js');
const request = require('supertest');
const { parseCookies } = require('../utils/utils.js');

describe('로그인 테스트', () => {
  let cookies;

  it('로그인이 진행되고 세션 쿠키가 등록됨', () => {
    request(app)
      .post('/user')
      .set('Accept', 'application/json')
      .send({ userid: 'asdf', password: 'asdf' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.result, 'success');

        cookies = parseCookies(res.headers['set-cookie'].pop());
        assert.ok(cookies.loginSession);
      });
  });

  it('세션 유지 테스트', () => {
    request(app)
      .get('/user')
      .set('Cookie', [`loginSession=${cookies.loginSession}`])
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.result, 'find');
      });
  });
});

describe('회원가입 테스트', () => {
  const newUser = {
    userid: 'user01',
    password: 'Password123!',
    name: 'user01',
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
