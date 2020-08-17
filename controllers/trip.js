const {
    Trip,
    Country
} = require('../models');
const joi = require('@hapi/joi');

exports.readTrip = async (req, res) => {
    try {
        const trip = await Trip.findAll({
            include: {
                model: Country,
                as: "country",
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
            attributes: {
                exclude: ["countryId", "updatedAt", "createdAt"],
            },
        });

        res.status(200).send({
            message: "Response Success",
            data: trip
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

exports.readOneTrip = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const detailTrip = await Trip.findOne({
            where: {
                id
            },
            include: [{
                model: Country,
                as: 'country',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'countryId']
            }
        });

        if (!detailTrip)
            return res.status(400).send({
                message: `Country with id ${id} is not exist`,
            });

        res.status(200).send({
            message: "Response Success",
            data: detailTrip,

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

exports.createTrip = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const {
            title,
            countryId,
            accomodation,
            transportation,
            eat,
            day,
            night,
            dateTrip,
            price,
            quota,
            description,
            image
        } = req.body;

        const schema = joi.object({
            title: joi.string().min(3).required(),
            countryId: joi.required(),
            accomodation: joi.string().min(3).required(),
            transportation: joi.string().min(3).required(),
            eat: joi.string().required(),
            day: joi.required(),
            night: joi.required(),
            dateTrip: joi.required(),
            price: joi.required(),
            quota: joi.required(),
            description: joi.string().required(),
            image: joi.required(),
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

        const cekCountry = await Country.findOne({
            where: {
                id: req.body.countryId
            }
        });

        if (!cekCountry) {
            return res.status(400).send({
                message: 'Country Not Found'
            });
        }

        const trip = await Trip.create(req.body);

        const tripResult = await Trip.findOne({
            where: {
                id: trip.id
            },
            include: {
                model: Country,
                as: 'country',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
        });

        res.status(200).send({
            message: "Trip has been created",

            data: tripResult
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

exports.updateTrip = async (req, res) => {

    try {
        const {
            id
        } = req.params;

        const {
            title,
            countryId,
            accomodation,
            transportation,
            eat,
            day,
            night,
            dateTrip,
            price,
            quota,
            description,
            image
        } = req.body;

        const resultTrip = await Trip.update(req.body, {
            where: {
                id
            },
            include: [{
                model: Country,
                as: 'country',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'countryId']
            }
        });

        res.status(200).send({
            message: "Trip has been updated",
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

exports.deleteTrip = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const deleteTrip = await Trip.destroy({
            where: {
                id: id,
            },
        });

        res.status(200).send({
            message: "Response Success",
            data: {
                id
            }
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