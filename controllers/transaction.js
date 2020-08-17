const {
    Transaction,
    Trip,
    User
} = require('../models');
const joi = require('@hapi/joi');

exports.readTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findAll({
            include: {
                model: Trip,
                as: "trip",
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
            attributes: {
                exclude: ["TripId", "tripId", "updatedAt", "createdAt"],
            },
        });

        if (transaction) {
            return res.status(200).send({
                status: 'success',
                data: transaction
            });
        } else {
            return res.status(500).send({
                message: 'Server Error'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: {
                message: 'Server Error'
            }
        });
    }
};

exports.readOneTransaction = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const detailTransaction = await Transaction.findOne({
            where: {
                id
            },
            include: {
                model: Trip,
                as: "trip",
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
            attributes: {
                exclude: ["TripId", "tripId", "updatedAt", "createdAt"],
            },
        });

        if (!detailTransaction)
            return res.status(400).send({
                message: `Country with id ${id} is not exist`,
            });

        res.status(200).send({
            message: "Response Success",
            data: detailTransaction,

        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: {
                message: 'Server Error'
            },
        });
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const {
            counterQty,
            total,
            status,
            attachment,
            tripId,
            userId
        } = req.body;

        const schema = joi.object({
            counterQty: joi.required(),
            total: joi.required(),
            status: joi.string().min(3).required(),
            attachment: joi.string().min(1).required(),
            tripId: joi.required(),
            userId: joi.required(),
        });
        const {
            error
        } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                error: {
                    message: error.details[0].message
                }
            });
        }

        const cekTrip = await Trip.findOne({
            where: {
                id: req.body.tripId
            }
        });

        if (!cekTrip) {
            return res.status(400).send({
                message: 'Trip Not Found'
            });
        }

        const cekUser = await User.findOne({
            where: {
                id: req.body.userId
            }
        });

        if (!cekUser) {
            return res.status(400).send({
                message: 'User Not Found'
            });
        }

        const transaction = await Transaction.create(req.body);

        const transactionResult = await Transaction.findOne({
            where: {
                id: transaction.id
            },
            include: {
                model: Trip,
                as: "trip",
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
            attributes: {
                exclude: ["TripId", "tripId", "updatedAt", "createdAt"],
            },
        });

        res.status(200).send({
            message: "Transaction has been created",

            data: transactionResult
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: {
                message: 'Server Error'
            },
        });
    }
}

exports.updateTransaction = async (req, res) => {

    try {
        const {
            id
        } = req.params;

        const {
            counterQty,
            total,
            status,
            attachment,
            tripId,
            userId
        } = req.body;

        const resultTransaction = await Transaction.update(req.body, {
            where: {
                id
            },
            include: {
                model: Trip,
                as: "trip",
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
            attributes: {
                exclude: ["TripId", "tripId", "updatedAt", "createdAt"],
            },
        });

        res.status(200).send({
            message: "Transaction has been updated",
            data: req.body
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: {
                message: 'Server Error'
            },
        });
    }
}