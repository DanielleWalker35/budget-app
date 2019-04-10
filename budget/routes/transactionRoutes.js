const express = require("express");
const transactionRouter = express.Router();

const TransactionModel = require("../models/transactionModel.js");

transactionRouter.route("/")
    .get((req, res) => {
        TransactionModel.find(req.query)
            .exec((err, transaction) => {
                if (err) return res.send(err);
                res.status(200).send(transaction);
            })
    })
    .post((req, res) => {
        const newTransaction = new TransactionModel(req.body);
        newTransaction.save((err, createdTransaction) => {
            if (err) return res.send(err);
            res.status(201).send(createdTransaction);
        })
    })

transactionRouter.route("/:id")
    .get((req, res) => {
        TransactionModel.findOne({ _id: req.params.id }, (err, foundTransaction) => {
            if (err) return res.send(err);
            if (!foundTransaction) return res.status(404).send({ message: "Transaction not found." })
            res.status(200).send(foundTransaction);
        })
    })
    .delete((req, res) => {
        TransactionModel.findOneAndRemove({ _id: req.params.id }, (err, deletedTransaction) => {
            if (err) return res.send(err);
            if (!deletedTransaction) return res.status(404).send({ message: "Transaction not found." });
            res.status(200).send({ message: `${deletedTransaction.name} was successfully deleted.` });
        })
    })
    .put((req, res) => {
        TransactionModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .exec((err, updatedTransaction) => {
                if (err) return res.send(err);
                if (!updatedTransaction) return res.status(404).send({ message: "Transaction not found." });
                res.status(200).send(updatedTransaction);
            })
    })

module.exports = transactionRouter;