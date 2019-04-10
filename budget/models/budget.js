const mongoose = require("mongoose");
const { Schema } = mongoose;

const budgetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    transactions: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'transaction' 
    }],

})

const BudgetModel = mongoose.model("budget", budgetSchema);

module.exports = BudgetModel;