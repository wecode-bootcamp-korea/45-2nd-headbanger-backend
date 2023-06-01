const request = require('supertest');

const { createApp } = require('../../app');
const { dataSource } = require('../../src/models/dataSource');

const jwt = require('jsonwebtoken');
const truncate = require('../test-client');

const themeFixture = require('../fixtures/themes-fixture');
const regionFixture = require('../fixtures/regions-fixture');
const campFixture = require('../fixtures/camps-fixture');
const reviewFixture = require('../fixtures/reviews-fixture');
const userFixture = require('../fixtures/users-fixture');

const themeData = require('../data/themes-data');
const regionData = require('../data/regions-data');
const campData = require('../data/camps-data');
const reviewData = require('../data/reviews-data');
const userData = require('../data/users-data');
const { response } = require('express');

const userId = 2;
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

describe('getReview', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await themeFixture.createThemes(themeData.testTheme);
    await regionFixture.createRegions(regionData.testRegion);
    await userFixture.createUsers(userData.testUser);
    await campFixture.createCamps(campData.testCamp);
    await reviewFixture.createReviews(reviewData.testReview);
  });

  const tableList = ['themes', 'regions', 'users', 'camps', 'reviews'];

  afterAll(async () => {
    await truncate.truncateTables(tableList);
  });
  test(`SUCCESS to POST_REVIEW WHERE campid `, async () => {
    const response = await request(app)
      .post(`/reviews`)
      .set({ authorization: token })
      .send({
        campId: '1',
        view: '1',
        safety: '2',
        cost: '3',
        clean: '4',
        convenience: '5',
        content: '태원님 왔다감~',
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body.message).toEqual(`SUCCESS_INPUT_REVIEW👍`);
  });
  test(`FAIL to POST_REVIEW : KEY_ERROR`, async () => {
    const response = await request(app)
      .post('/reviews')
      .set({ authorization: token })
      .send({
        campId: '1',
        safety: '2',
        cost: '3',
        clean: '4',
        convenience: '5',
        content: '태원님 왔다감~',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual(`KEY_ERROR😞`);
  });
  test('SUCCESS : get review WHERE campid', async () => {
    const expectedReview = {
      reviews: [
        {
          avgGrade: 4.4,
          content: 'Lovely campground!',
          grade: {
            cost_score: 4,
            view_score: 4,
            clean_score: 4,
            safety_score: 5,
            convenience_score: 5,
          },
          name: 'name_test1',
          user_id: 1,
        },
      ],
      total_grade: [
        {
          avg_view: 4,
          avg_safety: 5,
          avg_cost: 4,
          avg_clean: 4,
          avg_convenience: 5,
          total_avg_grade: 4.4,
        },
      ],
    };

    const response = await request(app).get('/reviews/2');

    expect(response.statusCode).toEqual(200);
    expect(response.body.result).toEqual(expectedReview);
  });

  test(`FAil to get review WHERE campid : not campId data`, async () => {
    const response = await request(app).get('/reviews/3');

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual(undefined);
  });

  test(`FAIL to get review WHERE campid : not insert campid number`, async () => {
    const response = await request(app).get('/reviews/w');

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual(`INVALID_DATA_INPUT😮`);
  });
});
