    
const mongoose = require("mongoose");
const {Schema} = mongoose;

const transactionSchema = new Schema ({
    transactionName: {
        type: String,
        required: true
    },
    amount: {
        type: Number
    },
    type: {
        type: String
    },
    budget: { 
        type: Schema.Types.ObjectId, 
        ref: 'budget' 
    },
})

const TransactionModel = mongoose.model("transaction", transactionSchema);

module.exports = TransactionModel;