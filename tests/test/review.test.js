const request = require('supertest');

const { createApp } = require('../../app');
const { dataSource } = require('../../src/models/dataSource');

const truncate = require('../test-client');

const themeFixture = require('../fixtures/themes-fixture');
const regionFixture = require('../fixtures/regions-fixture');
const campFixture = require('../fixtures/camps-fixture');
const reviewFixture = require('../fixtures/reviews-fixture');
const userFixture = require('../fixtures/users-fixture');

const themeData = require('../data/themes');
const regionData = require('../data/regions');
const campData = require('../data/camps');
const reviewData = require('../data/reviews');
const userData = require('../data/users');
const { response } = require('express');

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

    const response = await request(app).get('/review/2');

    expect(response.statusCode).toEqual(200);
    expect(response.body.result).toEqual(expectedReview);
  });

  test(`FAil to get review WHERE campid : not campId data`, async () => {
    const response = await request(app).get('/review/3');

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('INVALID_campId😦');
  });
  test(`FAIL to get review WHERE campid : not insert campid number`, async () => {
    await request(app)
      .get(`/review/w`)
      .expect(400)
      .expect({ message: `INVALID_DATA_INPUT😮` });
  });
});
