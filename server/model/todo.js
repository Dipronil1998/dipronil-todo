const mongoose = require('mongoose');
const {validCategories,
    validPaymentMethod,
    validPaymentBank,
    validType,
    validIncomeCategories
} = require('../interface/dbEnum');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
    },
    isComplete: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
});


// eslint-disable-next-line
const Todo = new mongoose.model('Todo', todoSchema);
module.exports = Todo;
