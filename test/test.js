const assert = require('assert');
const app = require('../app.js');
const request = require('supertest');
const { parseCookies } = require('../utils/utils.js');

describe('로그인 테스트', () => {
  it('로그인이 진행되고 세션 쿠키가 등록됨', () => {
    request(app)
      .post('/user')
      .set('Accept', 'application/json')
      .send({ userid: 'asdf', password: 'asdf' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.result, 'success');

        const cookies = parseCookies(res.headers['set-cookie'].pop());
        assert.ok(cookies.loginSession);
      });
  });
});
