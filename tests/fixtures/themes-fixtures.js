const { dataSource } = require('../../src/models/dataSource');

const createThemes = (themeList) => {
  let data = [];

  for (const theme of themeList) {
    data.push([theme.id, theme.theme]);
  }

  return dataSource.query(
    `INSERT INTO themes (
      id,
      theme
    ) VALUES ?
  `,
    [data]
  );
};

module.exports = { createThemes };
