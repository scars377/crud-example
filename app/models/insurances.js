const db = [
  {
    id: 0,
    userId: 0,
    types: [],
    startDate: '2020-01-01',
    endDate: '2021-01-01',
  },
];

const normalize = ({
  userId = 0,
  types = [],
  startDate = '2020-01-01',
  endDate = '2021-01-01',
} = {}) => ({
  userId,
  types,
  startDate,
  endDate,
});

let id = 1;

module.exports = {
  db,
  create(data) {
    db.push({ id, ...normalize(data) });
    id += 1;
  },
  get(id) {
    return db.find((item) => item.id === id);
  },
  list(userId) {
    return userId === undefined
      ? db
      : db.filter((item) => item.userId === userId);
  },
  update(id, data) {
    const idx = db.findIndex((item) => item.id === id);
    const item = db[idx];
    db.splice(idx, 1, { ...item, ...normalize(data) });
  },
  delete(id) {
    const idx = db.findIndex((item) => item.id === id);
    db.splice(idx, 1);
  },
};
