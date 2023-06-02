const request = require('supertest');

const { createApp } = require('../../app');
const { dataSource } = require('../../src/models/dataSource');

const jwt = require('jsonwebtoken');
const truncate = require('../test-client');

const themeFixture = require('../fixtures/themes-fixture');
const regionFixture = require('../fixtures/regions-fixture');
const campFixture = require('../fixtures/camps-fixture');
const userFixture = require('../fixtures/users-fixture');
const wishFixture = require('../fixtures/wishlists-fixture');

const themeData = require('../data/themes-data');
const regionData = require('../data/regions-data');
const campData = require('../data/camps-data');
const userData = require('../data/users-data');
const wishData = require('../data/wishlists-data');

const { response } = require('express');

const vailedUserId = 1;
const InvailedUserId = 3;

const vailedToken = jwt.sign(
  {
    id: vailedUserId,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXP,
    issuer: process.env.JWT_ISSUER,
  }
);
const InvailedToken = jwt.sign(
  {
    id: InvailedUserId,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXP,
    issuer: process.env.JWT_ISSUER,
  }
);

describe('wishlist', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await themeFixture.createThemes(themeData.testTheme);
    await regionFixture.createRegions(regionData.testRegion);
    await userFixture.createUsers(userData.testUser);
    await campFixture.createCamps(campData.testCamp);
    await wishFixture.createWishes(wishData.testWish);
  });

  const tableList = ['themes', 'regions', 'users', 'camps', 'wishlists'];

  afterAll(async () => {
    await truncate.truncateTables(tableList);
  });

  test('SUCCESS POST_WISHLIST', async () => {
    const response = await request(app)
      .post('/wishs/1')
      .set({ authorization: vailedToken });

    expect(response.statusCode).toEqual(201);
    expect(response.body.result[0]).toEqual([
      {
        camp_id: 1,
      },
    ]);
  });
  test('SUCCESS DEL_WISHLIST', async () => {
    const response = await request(app)
      .post('/wishs/1')
      .set({ authorization: vailedToken });

    expect(response.statusCode).toEqual(201);
    expect(response.body.result).toEqual([
      {
        camp_id: 1,
        id: 4,
        updated_at: null,
        user_id: 1,
      },
    ]);
  });
  test('FAIL POST_WISHLIST : INVALID_TOKEN', async () => {
    const response = await request(app).post('/wishs/1');

    expect(response.statusCode).toEqual(409);
    expect(response.body.message).toEqual('TOKEN_DOES_NOT_EXIST');
  });
  test('SUCCESS GET WISH WHERE user_id', async () => {
    const response = await request(app)
      .get('/wishs')
      .set({ authorization: vailedToken });

    expect(response.statusCode).toEqual(200);
    expect(response.body.result).toEqual([
      {
        address: 'address_test1',
        camp_id: 1,
        camp_name: 'campsite_name_test1',
        thumbnail: 'thumbnail_test1',
      },
    ]);
  });
  test('FAIL GET WISH : INVAILED_TOKEN', async () => {
    const response = await request(app).get('/wishs');

    expect(response.statusCode).toEqual(409);
    expect(response.body.message).toEqual('TOKEN_DOES_NOT_EXIST');
  });
});
