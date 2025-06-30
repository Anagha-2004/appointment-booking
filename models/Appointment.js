const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: String,
  date: String,
  time: String,
  doctor: String,
  specialisation: String,
  patientName: String,
  patientPhone: String,
  patientEmail: String,
  symptoms: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
