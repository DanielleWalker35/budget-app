const express = require("express");
const budgetRouter = express.Router();

const BudgetModel = require("../models/budgetModel.js");

budgetRouter.route("/")
    .get((req, res) => {
        BudgetModel.find(req.query)
            .exec((err, budget) => {
                if (err) return res.send(err);
                res.status(200).send(budget);
            })
    })
    .post((req, res) => {
        const newBudget = new BudgetModel(req.body);
        newBudget.save((err, createdBudget) => {
            if (err) return res.send(err);
            res.status(201).send(createdBudget);
        })
    })

budgetRouter.route("/:id")
    .get((req, res) => {
        BudgetModel.findOne({ _id: req.params.id }, (err, foundBudget) => {
            if (err) return res.send(err);
            if (!foundBudget) return res.status(404).send({ message: "Budget not found." })
            res.status(200).send(foundBudget);
        })
    })
    .delete((req, res) => {
        BudgetModel.findOneAndRemove({ _id: req.params.id }, (err, deletedBudget) => {
            if (err) return res.send(err);
            if (!deletedBudget) return res.status(404).send({ message: "Budget not found." });
            res.status(200).send({ message: `${deletedBudget.name} was successfully deleted.` });
        })
    })
    .put((req, res) => {
        BudgetModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .exec((err, updatedBudget) => {
                if (err) return res.send(err);
                if (!updatedBudget) return res.status(404).send({ message: "Budget not found." });
                res.status(200).send(updatedBudget);
            })
    })

module.exports = budgetRouter;