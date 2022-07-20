const mongoose = require('mongoose');

const billschema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },

  units: {
    type: Number,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },

  paydate: {
    type: Date,
    default: Date.now,
  },
  billdate: {
    type: Date,
  },
});

const billTable = new mongoose.model('bill', billschema);
module.exports = billTable;
