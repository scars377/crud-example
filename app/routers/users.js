const express = require('express');
const users = require('../models/users');
const insuranceRouter = require('./insurances');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    try {
      const data = users.list();
      res.json({ success: true, data });
    } catch (error) {
      res.json({ success: false, error });
    }
  })
  .post((req, res) => {
    try {
      users.create(req.body);
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, error });
    }
  });

router
  .route('/:id')
  .all((req, res, next) => {
    res.locals.id = parseInt(req.params.id, 10);
    next();
  })
  .get((req, res, next) => {
    try {
      const data = users.get(res.locals.id);
      res.json({ success: true, data });
    } catch (error) {
      res.json({ success: false, error });
    }
  })
  .put((req, res, next) => {
    try {
      users.update(res.locals.id, req.body);
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, error });
    }
  })
  .delete((req, res, next) => {
    try {
      users.delete(res.locals.id);
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, error });
    }
  });

router.use(
  '/:id/insurances',
  (req, res, next) => {
    res.locals.userId = parseInt(req.params.id, 10);
    next();
  },
  insuranceRouter,
);

module.exports = router;
