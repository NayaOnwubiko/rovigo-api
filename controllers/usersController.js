const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile'));
require('dotenv').config();
const jwt = require('jsonwebtoken');

//Creating a new user
exports.signup = async(req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("Please complete all required fields")
    }

    const hashedPassword = bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT_ROUNDS));

//Insert user into database
    const newUserIds = await knex("users")
                            .insert({
                                name,
                                email,
                                password: hashedPassword
                            });
    const newUserId = newUserIds[0];

    const newUsers = await knex("users")
                            .where({ id: newUserId });
    
    const newUser = newUsers[0];

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY);

    res.json({
        message: "Successfully signed up",
        token
    });
};

exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            error: "Email and password fields are required"
        })
    }

//Validates the user
    knex("users")
        .where({ email: req.body.email })
        .then(users => {
            if (users.length !==1) {
                return res.status(401).json({
                    error: "Invalid login credentials"
                })
            }
        const foundUser = users[0];

        //Based on this user found, check the password
        const isValidPassword = bcrypt.compareSync(req.body.password, foundUser.password)

        if (!isValidPassword) {
            return res.status(401).json({
                error: "Invalid login credentials"
            })
        }

        const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET_KEY);

        res.json({
            message: "Successfully logged in",
            token: token
        })
    })
};

exports.approve = async(req, res) => {
    const user = await knex("users")
        .where({ id: req.userId })
        .first();
        delete user.password;
        res.json(user);
};