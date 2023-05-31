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

const themeData = require('../data/themes');
const regionData = require('../data/regions');
const campData = require('../data/camps');
const campPictureData = require('../data/camp-pictures');
const zoneSizeOptionData = require('../data/zoneSizeOptions');
const campingZoneData = require('../data/campingZones');
const userData = require('../data/users');
const reservationStatusData = require('../data/reservationStatus');
const reservationData = require('../data/reservations');
const zonesReservationData = require('../data/zonesReservations');
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
    .get("/users/reservationLists")
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
          totalMembers: 1,
          totalPrice: '10000.00',
          zoneNames: [
              'A1'
          ]
        }
      ],
      pastList: [
        {
          campsiteName: 'campsite_name_test2',
          thumbnail: 'thumbnail_test2',
          reservationNumber: 'reservation-number-test-12345',
          startDate: '2023-05-03',
          endDate: '2023-05-05',
          totalMembers: 2,
          totalPrice: '20000.00',
          zoneNames: [
              'B1'
          ]
        }
      ],
      cancelledList: [
        {
          campsiteName:'campsite_name_test3',
          thumbnail: 'thumbnail_test3',
          reservationNumber: 'reservation-number-test-12345',
          startDate: '2023-07-03',
          endDate: '2023-07-05',
          totalMembers: 3,
          totalPrice: '30000.00',
          zoneNames: [
              'C1'
          ]
        }
      ]
    })
  })
});