const {
    user
} = require("../../models");

exports.get = async (req, res) => { //async function/method yg return promise
    try {
        const user = await user.findAll(); //await => untuk menunggu findAll berjalan
        res.status(200).send({
            message: "Response Success",
            data: {
                user
            },
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: {
                message: "Server Error",
                error: err
            }
        })
    }
}

exports.readOne = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const detailUser = await user.findOne({
            where: {
                id: id, //bisa juga langsung id
            },
        }); //method findOne untuk ambil satu data

        if (!detailUser)
            return res.status(400).send({
                message: `User with id ${id} is not exist`,
            });

        res.status(200).send({
            message: "Response Success",
            data: {
                detailUser
            },
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: {
                message: "Server Error",
                error: err
            }
        })
    }
}

exports.create = async (req, res) => {
    try {
        const responnseUser = await todo.create(req.body)

        res.status(200).send({
            message: "Response Success",
            data: {
                data: {
                    user: responnseUser,
                }
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: {
                message: "Server Error",
                error: err
            }
        })
    }
}