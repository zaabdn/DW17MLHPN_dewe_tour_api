const {
    Trip,
    User
} = require("../../models");

exports.readUser = async (req, res) => {
    try {
        const user = await User.findAll({
            include: { //relasi antar tabel
                mode: Trip,
                attributes: {
                    exclude: ["createdAt", "updateAt"],
                },
            },
        });

        res.status(200).send({
            message: "Success",
            data: {
                user
            }
        })
    } catch (err) {

    }
}

exports.readTrip = async (req, res) => {
    try {
        const trip = await Trip.findAll({
            include: {
                model: User,
                as: "parent",
            }
        })

        res.status(200).send({
            mmessage: "Success",
            data: {
                trip,
            },
        });
    } catch (err) {

    }
}