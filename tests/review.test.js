const request = require('supertest');

const { createApp } = require('../app');
const { dataSource } = require('../src/models/dataSource');

const createReview = require('./createData/createReviewData');
const reviewDummy = require('./dummyData/reviewDummyData');

describe('getReview', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await createReview.createReview(reviewDummy.reviews);
  });

  afterAll(async () => {
    await dataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await dataSource.query(`TRUNCATE reviews`);
    await dataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
    await dataSource.query(`ALTER TABLE reviews AUTO_INCREMENT = 1`);
    await dataSource.destroy();
  });

  test('SUCCESS : get review WHERE campid', async () => {
    const expectedReview = {
      reviews: [
        {
          content: 'Lovely campground!',
          avgGrade: 4.4,
          grade: {
            cost_score: 4,
            view_score: 4,
            clean_score: 4,
            safety_score: 5,
            convenience_score: 5,
          },
          user_id: 3,
          name: 'Mike Johnson',
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
    await request(app)
      .get('/review/2')
      .expect(200)
      .expect({ result: expectedReview });
  });

  test(`FAil to get review WHERE campid : not campId data`, async () => {
    await request(app)
      .get('/review/1')
      .expect(400)
      .expect({ message: 'INVALID_campId😦' });
  });
  test(`FAIL to get review WHERE campid : not insert campid number`, async () => {
    await request(app)
      .get(`/review/w`)
      .expect(400)
      .expect({ message: `INVALID_DATA_INPUT😮` });
  });
});
