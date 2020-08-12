const {
    Country
} = require('../models');

exports.readCountry = async (req, res) => {
    try {
        const country = await Country.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.status(200).send({
            message: "Response Success",
            data: country
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

exports.readOneCountry = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const detailCountry = await Country.findOne({
            where: {
                id: id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        if (!detailCountry)
            return res.status(400).send({
                message: `Country with id ${id} is not exist`,
            });

        res.status(200).send({
            message: "Response Success",
            data: detailCountry,

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

exports.createCountry = async (req, res) => {
    try {
        const {
            name,
            id
        } = await Country.create(req.body); //nama modul

        res.status(200).send({
            message: "Country has been created",

            data: {
                id,
                name
            }
            //nama tabel di db
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

exports.updateCountry = async (req, res) => {

    try {
        const {
            id
        } = req.params;

        const {
            name
        } = req.body;

        const resultCountry = await Country.update(req.body, {
            where: {
                id
            },
        });

        res.status(200).send({
            message: "Response Success",
            data: {
                id,
                name
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

exports.deleteCountry = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const deleteCountry = await Country.destroy({
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