// File: models/Budget.js
const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Make sure this matches your User model
    required: true
  }
});

module.exports = mongoose.model('Budget', BudgetSchema);
