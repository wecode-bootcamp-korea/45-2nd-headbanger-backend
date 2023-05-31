const request = require('supertest');

const { createApp } = require('../../app');
const { dataSource } = require('../../src/models/dataSource');

const amenitiesFixture = require('../fixtures/amenities-fixture');
const themesFixture = require('../fixtures/themes-fixture');
const regionsFixture = require('../fixtures/regions-fixture');
const campsFixture = require('../fixtures/camps-fixture');
const campsAmenitiesFixture = require('../fixtures/camps-amenities-fixture');
const campsPicturesFixture = require('../fixtures/camps-pictures-fixture');

const amenitiesData = require('../data/amenities');
const themesData = require('../data/themes');
const regionsData = require('../data/regions');
const campsData = require('../data/camps');
const campsAmenitiesData = require('../data/camp-amenities');
const campsPicturesData = require('../data/camp-pictures');

const truncate = require('../test-client');

describe('get camp detail by camp_id', () => {
  let app;

  beforeAll(async () => {
    app = createApp();

    await dataSource.initialize();

    await amenitiesFixture.createAmenities(amenitiesData.testAmenity);
    await themesFixture.createThemes(themesData.testTheme);
    await regionsFixture.createRegions(regionsData.testRegion);
    await campsFixture.createCamps(campsData.testCamp);
    await campsAmenitiesFixture.createCampsAmenities(
      campsAmenitiesData.testCampAmenity
    );
    await campsPicturesFixture.createCampsPictures(
      campsPicturesData.testCampPicture
    );
  });

  const tableList = [
    'amenities',
    'themes',
    'regions',
    'camps',
    'camps_amenities',
    'camp_pictures',
  ];

  afterAll(async () => {
    await truncate.truncateTables(tableList);
  });

  test('FAIL: invalid camp_id', async () => {
    const res = await request(app).get('/products/5');
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'DATA NOT FOUND' });
  });

  test('SUCCESS: get camp detail', async () => {
    const res = await request(app).get('/products/1');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      message: 'SUCCESS',
      data: [
        {
          campId: 1,
          campName: 'campsite_name_test1',
          address: 'address_test1',
          pictures: [
            'test_picture_1',
            'test_picture_2',
            'test_picture_3',
            'test_picture_4',
          ],
          price: '10000.00',
          description: 'description_test1',
          thumbnail: 'thumbnail_test1',
          amenities: ['test_amenity_1', 'test_amenity_2', 'test_amenity_3'],
          region: 'test_region_1',
          theme: 'test_theme_1',
          viewMap: 'view_map_test1',
        },
      ],
    });
  });
});
