const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

router.post(
  '/event',
  eventController.uploadEventPhoto,
  eventController.resizeEventPhoto,
  eventController.createEvent
);

module.exports = router;
