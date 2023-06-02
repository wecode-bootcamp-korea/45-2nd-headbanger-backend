const request = require('supertest');

const { createApp } = require('../../app');
const { dataSource } = require('../../src/models/dataSource');

const truncate = require('../test-client');

const themeFixture = require('../fixtures/themes-fixture');
const regionFixture = require('../fixtures/regions-fixture');
const campFixture = require('../fixtures/camps-fixture');
const campPictureFixture = require('../fixtures/campPictures-fixture');
const zoneSizeOptionFixture = require('../fixtures/zoneSizeOptions-fixture');
const campingZoneFixture = require('../fixtures/campingZones-fixture');
const userFixture = require('../fixtures/users-fixture');
const reservationStatusFixture = require('../fixtures/reservationStatus-fixture');
const reservationFixture = require('../fixtures/reservations-fixture');
const zonesReservationsFixture = require('../fixtures/zonesReservations-fixture');

const themeData = require('../data/themes-data');
const regionData = require('../data/regions-data');
const campData = require('../data/camps-data');
const campPictureData = require('../data/campPictures-data');
const zoneSizeOptionData = require('../data/zoneSizeOptions-data');
const campingZoneData = require('../data/campingZones-data');
const userData = require('../data/users-data');
const reservationStatusData = require('../data/reservationStatus-data');
const reservationData = require('../data/reservations-data');
const zonesReservationData = require('../data/zonesReservations-data');
const { response } = require('express');

describe('Get Available Unavailable Camping Zone', () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await themeFixture.createThemes(themeData.testTheme);
    await regionFixture.createRegions(regionData.testRegion);
    await campFixture.createCamps(campData.testCamp);
    await campPictureFixture.createCampPictures(campPictureData.testCampPicture);
    await zoneSizeOptionFixture.createZoneSizeOptions(zoneSizeOptionData.testZoneSizeOption);
    await campingZoneFixture.createCampingZones(campingZoneData.testCampingZone);
    await userFixture.createUsers(userData.testUser);
    await reservationStatusFixture.createReservationStatus(reservationStatusData.testReservationStatus);
    await reservationFixture.createReservations(reservationData.testReservation);
    await zonesReservationsFixture.createZonesReservations(zonesReservationData.testZonesReservation);
  });

  const tableList = [
    'themes',
    'regions',
    'camps',
    'camp_pictures',
    'zone_size_options',
    'camping_zones',
    'users',
    'reservation_status',
    'reservations',
    'zones_reservations',
  ];
  afterAll(async () => {
    await truncate.truncateTables(tableList);
  });

  test('FAILED: invalid date value', async () => {
    const response = await request(app).get(
      '/products/camps?campId=1&startDate=2023-06-03&endDate=2023-06-01'
    );

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('INVALID_DATA');
  });

  test('SUCCESS: get campingZone', async () => {
    const response = await request(app).get(
      '/products/camps?campId=1&startDate=2023-06-03&endDate=2023-06-05'
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      availableZones: [
        {
          campId: 1,
          zoneName: 'A1',
          maxPeople: 2,
          coordinates: {
            x1: 11,
            x2: 12,
            x3: 13,
            x4: 14,
            y1: 21,
            y2: 22,
            y3: 23,
            y4: 24,
          },
          campingZoneId: 1,
          additionalPrice: 0,
        },
      ],
      unavailableZones: [
        {
          campId: 1,
          zoneName: 'A2',
          maxPeople: 2,
          coordinates: {
            x1: 11,
            x2: 12,
            x3: 13,
            x4: 14,
            y1: 21,
            y2: 22,
            y3: 23,
            y4: 24,
          },
          campingZoneId: 2,
          additionalPrice: 0,
        },
      ],
    });
  });
});
