const getFiltering = (region, theme, amenity, campName) => {
  let conditionArr = [];
  let whereClause = '';

  if (region) {
    conditionArr.push(`r.region_name IN (${region})`);
  }
  if (theme) {
    conditionArr.push(`t.theme IN (${theme})`);
  }
  if (amenity) {
    conditionArr.push(`a.amenity_name IN (${amenity})`);
  }
  if (campName) {
    conditionArr.push(`c.campsite_name = ${campName}`);
  }
  if (conditionArr.length > 0) {
    whereClause = 'WHERE' + ' ' + conditionArr.join(' AND ');
  }
  return whereClause;
};

const getOrdering = (orderBy) => {
  switch (orderBy) {
    case 'priceAsc':
      return 'ORDER BY c.price ASC, c.id ASC';
    case 'priceDesc':
      return 'ORDER BY c.price DESC, c.id ASC';
    case 'wishDesc':
      return 'ORDER BY whislist_count DESC, c.id ASC';
    case 'wishAsc':
      return 'ORDER BY whislist_count ASC, c.id ASC';
    default:
      return 'ORDER BY c.id';
  }
};

const getLimit = (limit, offset) => {
  if (!limit) {
    limit = 10;
  }
  if (!offset) {
    offset = 0;
  }
  return `LIMIT ${limit} OFFSET ${offset}`;
};

const isArray = (amenity) => {
  if (!Array.isArray(amenity)) {
    let amenityArr = [];
    amenityArr.push(amenity);
    return amenityArr;
  }
  return amenity;
};

module.exports = {
  getFiltering,
  getOrdering,
  getLimit,
  isArray,
};
