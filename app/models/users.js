const insurances = require('./insurances');

const db = [
  {
    id: 0,
    name: 'Yao',
    gender: 'male',
    age: 22,
    email: 'yao@gmail.com',
    zipCode: 100,
  },
];

const normalize = ({
  name = '',
  gender = 'male',
  age = 18,
  email = '',
  zipCode = 100,
} = {}) => ({
  name,
  gender,
  age,
  email,
  zipCode,
});

let id = 1;

module.exports = {
  create(data) {
    db.push({ id, ...normalize(data) });
    id += 1;
  },
  get(id) {
    const user = db.find((item) => item.id === id);
    return {
      ...user,
      insurances: insurances.list(user.id).map((item) => item.id),
    };
  },
  list() {
    return db.map((item) => this.get(item.id));
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
