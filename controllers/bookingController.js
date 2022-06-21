const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');

exports.createBooking = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, phone, age, eventName, hostName, dateTime } = req.body;

  const transformedBooking = {
    firstName,
    lastName,
    email,
    phone,
    age,
    event: { eventName, hostName, dateTime },
  };
  console.log(transformedBooking);
  await Booking.create(transformedBooking);

  res.status(201).json({
    status: 'success',
    message: 'Booking made successfully!',
  });
});
