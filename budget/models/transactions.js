    
const mongoose = require("mongoose");
const {Schema} = mongoose;

const transactionSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number
    },
    type: {
        type: String
    }
})

const TransactionModel = mongoose.model("transaction", transactionSchema);

module.exports = TransactionModel;