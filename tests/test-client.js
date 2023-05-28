<<<<<<< HEAD
const { dataSource } = require('../src/models/dataSource');
=======
const { dataSource } = require("../src/models/dataSource");
>>>>>>> 0201a86 ([ADD]: 상세 페이지>조감도의 최대 인원 수용 및 추가 가격 반환)

const truncateTables = async (tableList) => {
  await dataSource.query(`SET FOREIGN_KEY_CHECKS=0`);

  for (let table of tableList) {
    await dataSource.query(`TRUNCATE table ${table}`);
    await dataSource.query(`ALTER TABLE ${table} AUTO_INCREMENT = 1`);
  }

  await dataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
  await dataSource.destroy();
<<<<<<< HEAD
};

module.exports = { truncateTables };
=======
}

module.exports = { truncateTables }
>>>>>>> 0201a86 ([ADD]: 상세 페이지>조감도의 최대 인원 수용 및 추가 가격 반환)
