const request = require('supertest');

const { createApp } = require('../../app');
const { dataSource } = require('../../src/models/dataSource');
const jwt = require('jsonwebtoken');

const truncate = require('../test-client')

const themeFixture = require('../fixtures/themes-fixture');
const userFixture = require('../fixtures/users-fixture');

const themeData = require('../data/themes');
const userData = require('../data/users');
const { response } = require('express');

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

describe("Get Zone Information By CampId", () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize()
    await themeFixture.createThemes(themeData.testTheme);
    await userFixture.createUsers(userData.testUser);
  });
  
  const tableList = ['themes', 'users']
  afterAll(async () => {
    await truncate.truncateTables(tableList)
  });

  test("FAILED: token does not exist", async () => {
    const response = await request(app)
    .patch("/users/mypage/theme")
    .send({themeId: 1})

      expect(response.statusCode).toEqual(409);
      expect(response.body.message).toEqual('TOKEN_DOES_NOT_EXIST');
  });

  test("FAILED: invalid theme", async () => {
    const response = await request(app)
      .patch("/users/mypage/theme")
      .set({authorization: token})
      .send({themeId: 6})

      expect(response.body.message).toEqual('INVALID_DATA');
      expect(response.statusCode).toEqual(400);
  });

  test("SUCCESS: modify user theme", async () => {
    const response = await request(app)
    .patch("/users/mypage/theme")
    .set({authorization: token})
    .send({themeId: 1})
    console.log("!!!!!!!!!!!!", response.body, "!!!!!!!!!!!!!!!")
    expect(response.body.message).toEqual('MODIFY SUCCESS');
    expect(response.statusCode).toEqual(200);
    expect(response.body.result).toEqual(
      [
        {
          'userId': 1,
          'themeId': 1,
          'theme': '산'
        }
      ]
    )}
  )}
)