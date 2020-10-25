const express = require('express');
const insurances = require('../models/insurances');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    try {
      const data = insurances.list(res.locals.userId);
      res.json({ success: true, data });
    } catch (error) {
      res.json({ success: false, error });
    }
  })
  .post((req, res) => {
    try {
      insurances.create({ ...req.body, userId: res.locals.userId });
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
      const data = insurances.get(res.locals.id);
      res.json({ success: true, data });
    } catch (error) {
      res.json({ success: false, error });
    }
  })
  .put((req, res, next) => {
    try {
      insurances.update(res.locals.id, {
        ...req.body,
        userId: res.locals.userId,
      });
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, error });
    }
  })
  .delete((req, res, next) => {
    try {
      insurances.delete(res.locals.id);
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, error });
    }
  });

module.exports = router;
