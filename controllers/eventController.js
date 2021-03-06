const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const Event = require('../models/eventModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Event Photo-uploading functionalities
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please provide only images!', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadEventPhoto = upload.single('photo');
exports.resizeEventPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `event-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/${req.file.filename}`);

  next();
});

// Create event functionality
exports.createEvent = catchAsync(async (req, res, next) => {
  if (req.file) req.body.photo = req.file.filename;

  const { eventName, hostName, house, city, district, division, dateTime, photo, description } =
    req.body;

  const transFormedEvent = {
    eventName,
    hostName,
    venue: {
      house,
      city,
      district,
      division,
    },
    dateTime,
    photo,
    description,
  };

  await Event.create(transFormedEvent);

  res.status(201).json({
    status: 'success',
    message: 'Event created successfully!',
  });
});

// Get all events OR Search by name
exports.getEvents = catchAsync(async (req, res, next) => {
  let query;
  if (req.query.eventName) {
    query = { slug: req.query.eventName };
  }
  const events = await Event.find(query);

  if (!events || events.length < 1) {
    return next(new AppError('No events found. Please try again later!'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      events,
    },
  });
});

// Get an Event by Id
exports.getEventById = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    return next(new AppError('No event found with that Id!'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      event,
    },
  });
});
