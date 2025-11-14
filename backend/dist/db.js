"use strict";
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://girirahul2028_db_user:HpubPUIpLILEtPsm@paytm.ddhqe3i.mongodb.net/local');
const userschema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
const User = mongoose.model('User', userschema);
const Account = mongoose.model('Account', accountSchema);
module.exports = { User, Account };
