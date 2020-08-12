const {
    User
} = require('../models');

exports.readUser = async (req, res) => {
    try {
        const user = await User.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        });

        res.status(200).send({
            message: "Response Success",
            data: user
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

exports.deleteUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const deleteUser = await User.destroy({
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