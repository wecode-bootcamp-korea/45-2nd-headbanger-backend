const request = require('supertest');

const { createApp } = require('../../app');
const { dataSource } = require('../../src/models/dataSource');

const axios = require('axios');
const jwt = require('jsonwebtoken');

const themeFixture = require('../fixtures/themes-fixture');
const userFixture = require('../fixtures/users-fixture');

const themeData = require('../data/themes-data');
const userData = require('../data/users-data');

const truncate = require('../test-client');

jest.mock('axios');
jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => 'TOKEN'),
    verify: jest.fn(() => 'verify'),
  };
});

describe('email check', () => {
  let app;

  beforeAll(async () => {
    app = createApp();

    await dataSource.initialize();
    await themeFixture.createThemes(themeData.testTheme);
    await userFixture.createUsers(userData.testUser);
  });

  const tableList = ['users', 'themes'];

  afterAll(async () => {
    await truncate.truncateTables(tableList);
  });

  test('FAIL: Missing email in request body', async () => {
    const res = await request(app).post('/users').send({});
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'MISSING KEY' });
  });

  test('FAIL: Could not pass email validation test', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: '!@%@^@gmail.@$' });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'EMAIL IS NOT VALID' });
  });

  test('SUCCESS: User already exists in database', async () => {
    const res = await request(app).post('/users').send({
      email: 'inni@gmail.com',
    });
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'USER DOES NOT EXIST' });
  });

  test('SUCCESS: User does not exists in database', async () => {
    const res = await request(app).post('/users').send({
      email: 'inniqqqqqqq@gmail.com',
    });
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'USER DOES NOT EXIST' });
  });
});

describe('sign up', () => {
  let app;

  beforeAll(async () => {
    app = createApp();

    await dataSource.initialize();
    await themeFixture.createThemes(themeData.testTheme);
    await userFixture.createUsers(userData.testUser);
  });

  const tableList = ['users', 'themes'];

  afterAll(async () => {
    await truncate.truncateTables(tableList);
  });

  test('FAIL: sign up unsuccessful due to missing key', async () => {
    const res = await request(app).post('/users/signup').send({
      email: 'inni@gmail.com',
      password: 'Wkddlstjr95!',
      name: 'inni',
    });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'KEY ERROR' });
  });

  test('FAIL: sign up unsuccessful due to failed validation check', async () => {
    const res = await request(app).post('/users/signup').send({
      email: 'inn!@$#$#@@$@i@gmail.com',
      password: 'Wkddlstjr95!',
      name: 'inni',
      phoneNumber: '010-1234-5432',
    });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'EMAIL IS NOT VALID' });
  });

  test('FAIL: sign up unsuccessful due to failed validation check', async () => {
    const res = await request(app).post('/users/signup').send({
      email: 'inni@gmail.com',
      password: '!!!!!!!!',
      name: 'inni',
      phoneNumber: '010-1234-5432',
    });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'PASSWORD IS NOT VALID' });
  });

  test('SUCCESS: sign up successful', async () => {
    const res = await request(app).post('/users/signup').send({
      email: 'inni@gmail.com',
      password: 'Wkddlstjr95!',
      name: 'inni',
      phoneNumber: '010-1234-5432',
    });
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: 'SIGN UP SUCCESS' });
  });
});

describe('log in', () => {
  let app;

  beforeAll(async () => {
    app = createApp();

    await dataSource.initialize();
    await themeFixture.createThemes(themeData.testTheme);
    await userFixture.createUsers(userData.testUser);
  });

  const tableList = ['users', 'themes'];

  afterAll(async () => {
    await truncate.truncateTables(tableList);
  });

  test('FAIL: Log in unsuccessful due to missing key', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'inni@gmail.com',
    });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'KEY ERROR' });
  });

  test('FAIL: log in unsuccessful due to failed email validation check', async () => {
    const res = await request(app).post('/users/login').send({
      email: '@%@@#%@.com',
      password: 'Wkddlstjr95!',
    });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'EMAIL IS NOT VALID' });
  });

  test('FAIL: log in unsuccessful due to failed password validation check', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'inni@gmail.com',
      password: '!!!!!!!!!!',
    });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'PASSWORD IS NOT VALID' });
  });

  test('SUCCESS: Log in successful', async () => {
    const signUpResponse = await request(app).post('/users/signup').send({
      email: 'inni@gmail.com',
      password: 'Wkddlstjr95!',
      name: 'inni',
      phoneNumber: '010-3214-1234',
    });
    expect(signUpResponse.status).toEqual(200);
    expect(signUpResponse.body).toEqual({ message: 'SIGN UP SUCCESS' });

    const userId = 1;
    const token = jwt.sign(
      {
        id: userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXP,
        issuer: process.env.JWT_ISSUER,
      }
    );

    const res = await request(app)
      .post('/users/login')
      .send({ email: 'inni@gmail.com', password: 'Wkddlstjr95!' });
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ accessToken: token });
  });
});

describe('kakao login', () => {
  let app;

  beforeAll(async () => {
    app = createApp();

    await dataSource.initialize();
    await themeFixture.createThemes(themeData.testTheme);
    await userFixture.createUsers(userData.testUser);
  });

  const tableList = ['users', 'themes'];

  afterAll(async () => {
    await truncate.truncateTables(tableList);
  });

  test('FAILED : Missing Access Token', async () => {
    const res = await request(app).post('/users/kakao').send();
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'NO ACCESS TOKEN' });
  });

  test('SUCCESS: Successful existing kakao login', async () => {
    axios.post = jest.fn().mockReturnValue({
      data: {
        id: 123456,
        properties: { nickname: 'test' },
        kakao_account: {
          email: 'test@test.com',
        },
      },
    });

    const res = await request(app)
      .post('/users/kakao')
      .set({ authorization: 'TEST_ACCESS_TOKEN' });
    expect(res.status).toEqual(200);
  });

  test('SUCCESS: Successful new kakao log in', async () => {
    axios.post = jest.fn().mockReturnValue({
      data: {
        id: 234567,
        properties: { nickname: 'newTest' },
        kakao_account: {
          email: 'newTest@testmail.com',
        },
      },
    });

    const res = await request(app)
      .post('/users/kakao')
      .set({ authorization: 'TEST_ACCESS_TOKEN' });
    expect(res.status).toEqual(200);
  });
});