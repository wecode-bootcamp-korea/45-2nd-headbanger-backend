const getFiltering = ({ regionId, themeId, amenityId, campName, campId }) => {
  let conditionArr = [];
  let whereClause = '';

  if (regionId) {
    conditionArr.push(`r.id IN (${regionId})`);
  }
  if (themeId) {
    conditionArr.push(`t.id IN (${themeId})`);
  }
  if (amenityId) {
    conditionArr.push(`a.id IN (${amenityId})`);
  }
  if (campName) {
    conditionArr.push(`c.campsite_name = ${campName}`);
  }
  if (campId) {
    conditionArr.push(`r.camp_id = ${campId}`);
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

const isArray = (amenityId) => {
  if (!Array.isArray(amenityId)) {
    let amenityArr = [];
    amenityArr.push(amenityId);
    return amenityArr;
  }
  return amenityId;
};

module.exports = {
  getFiltering,
  getOrdering,
  getLimit,
  isArray,
};
