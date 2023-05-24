const request = require('supertest');

const { createApp } = require('../../app');
const { dataSource } = require('../../src/models/dataSource');

const truncate = require('../test-client')

const themeFixture = require('../fixtures/themes-fixture')
const regionFixture = require('../fixtures/regions-fixture')
const campFixture = require('../fixtures/camps-fixture')
const campingZoneFixture = require('../fixtures/campingZones-fixture')
const zoneSizeOptionFixture = require('../fixtures/zoneSizeOptions-fixture')

const themeData = require('../data/themes')
const regionData = require('../data/regions')
const campData = require('../data/camps')
const campingZoneData = require('../data/campingZones')
const zoneSizeOptionData = require('../data/zoneSizeOptions');
const { response } = require('express');

describe("Get Zone Information By CampId", () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize()
    await themeFixture.createThemes(themeData.testTheme);
    await regionFixture.createRegions(regionData.testRegion);
    await campFixture.createCamps(campData.testCamp);
    await zoneSizeOptionFixture.createZoneSizeOptions(zoneSizeOptionData.testZoneSizeOption);
    await campingZoneFixture.createCampingZones(campingZoneData.testCampingZone);
  });
  
  const tableList = ['themes', 'regions', 'camps', 'zone_size_options', 'camping_zones']
  afterAll(async () => {
    await truncate.truncateTables(tableList)
  });

  test("FAILED: invalid campingZone", async () => {
    const response = await request(app)
      .get("/camps/5/camping-zone")

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toEqual('INVALID_DATA');
  });
  test("FAILED: invalid campingZone", async () => {
    const response = await request(app)
      .get("/camps/camping-zone")

      expect(response.statusCode).toEqual(404);
  });

  test("SUCCESS: get campingZone", async () => {
    const response = await request(app)
    .get("/camps/1/camping-zone")
    
    expect(response.body.message).toEqual('GET SUCCESS' );
    expect(response.statusCode).toEqual(200);
    expect(response.body.result).toEqual({
      zoneInfo: [
        {
          id: 1,
          zoneName: 'A1',
          maxPeople: '2',
          coordinates: {
            "x1": 11,
            "x2": 12,
            "x3": 13,
            "x4": 14,
            "y1": 21,
            "y2": 22,
            "y3": 23,
            "y4": 24
          },
          additionalPrice: 0
        }
      ]
    })
  });
})