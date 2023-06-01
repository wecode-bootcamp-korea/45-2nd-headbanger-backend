const request = require('supertest');
const jwt = require('jsonwebtoken');

const { createApp } = require('../../app');
const { dataSource } = require('../../src/models/dataSource');

const truncate = require('../test-client');

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

const themeFixture = require('../fixtures/themes-fixture');
const regionFixture = require('../fixtures/regions-fixture');
const campFixture = require('../fixtures/camps-fixture');
const campPitureFixture = require('../fixtures/campPictures-fixture');
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

describe("Get Available Unavailable Camping Zone", () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize()
    await themeFixture.createThemes(themeData.testTheme);
    await regionFixture.createRegions(regionData.testRegion);
    await campFixture.createCamps(campData.testCamp);
    await campPitureFixture.createCampPictures(campPictureData.testCampPicture);
    await zoneSizeOptionFixture.createZoneSizeOptions(zoneSizeOptionData.testZoneSizeOption);
    await campingZoneFixture.createCampingZones(campingZoneData.testCampingZone);
    await userFixture.createUsers(userData.testUser);
    await reservationStatusFixture.createReservationStatus(reservationStatusData.testReservationStatus);
    await reservationFixture.createReservations(reservationData.testReservation);
    await zonesReservationsFixture.createZonesReservations(zonesReservationData.testZonesReservation);
  });

  const tableList = ['themes', 'regions', 'camps', 'camp_pictures', 'zone_size_options', 'camping_zones', 'users', 'reservation_status', 'reservations', 'zones_reservations']
  afterAll(async () => {
    await truncate.truncateTables(tableList)
  });

  test("SUCCESS: get campingZone", async () => {
    const response = await request(app)
    .get("/users/reservation-lists")
    .set({authorization: token})

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      scheduledList: [
        {
          campsiteName: 'campsite_name_test1',
          thumbnail: 'thumbnail_test1',
          reservationNumber: 'reservation-number-test-12345',
          startDate: '2023-06-03',
          endDate: '2023-06-05',
          totalMembers: 4,
          totalPrice: '40000.00',
          campingZoneNames: [
              'A2'
          ]
        },
        {
          campsiteName: 'campsite_name_test1',
          thumbnail: 'thumbnail_test1',
          reservationNumber: 'reservation-number-test-12345',
          startDate: '2023-07-01',
          endDate: '2023-07-03',
          totalMembers: 2,
          totalPrice: '10000.00',
          campingZoneNames: [
              'A1'
          ]
        }
      ],
      pastList: [
        {
          campsiteName: 'campsite_name_test2',
          thumbnail: 'thumbnail_test2',
          reservationNumber: 'reservation-number-test-12345',
          startDate: '2023-04-03',
          endDate: '2023-04-05',
          totalMembers: 3,
          totalPrice: '30000.00',
          campingZoneNames: [
              'B1'
          ]
        }
      ],
      cancelledList: [
        {
          campsiteName:'campsite_name_test3',
          thumbnail: 'thumbnail_test3',
          reservationNumber: 'reservation-number-test-12345',
          startDate: '2023-08-01',
          endDate: '2023-08-05',
          totalMembers: 2,
          totalPrice: '40000.00',
          campingZoneNames: [
              'C1'
          ]
        }
      ]
    })
  })
});