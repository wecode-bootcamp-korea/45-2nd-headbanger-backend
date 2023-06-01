const request = require('supertest');

const { createApp } = require('../../app');
const { dataSource } = require('../../src/models/dataSource');
const jwt = require('jsonwebtoken')

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

describe("Get Available Unavailable Camping Zone", () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize()
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
    'zones_reservations'
  ]
  afterAll(async () => {
    await truncate.truncateTables(tableList)
  });

  test("FAILED: token does not exist", async () => {
    const response = await request(app)
      .patch("/reservations")
      .send({reservationId: 4})

      expect(response.statusCode).toEqual(409);
      expect(response.body.message).toEqual('TOKEN_DOES_NOT_EXIST');
  });

  test("FAILED: cancel reservations", async () => {
    const response = await request(app)
      .patch("/reservations")
      .set({authorization: token})
      .send({reservationId: 5})
      console.log(response)

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toEqual('INVALID_DATA');
  });

  test("SUCCESS: cancel reservations", async () => {
    const response = await request(app)
    .patch("/reservations")
    .set({authorization: token})
    .send({reservationId: 1})

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual('CANCEL SUCCESS')
  });
})