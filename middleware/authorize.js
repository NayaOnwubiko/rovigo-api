require('dotenv').config();
const jwt = require('jsonwebtoken');

//Validate that the JWT is formatted correctly

module.exports = (req, res, next) => {
    const bearerTokenString = req.headers.authorization;

    if (!bearerTokenString) {
        return res.status(401).json({
            error: "Resource requires Bearer token in Authorization header"
        })
    }
    const splitBearerToken = bearerTokenString.split(" ");

    if (splitBearerToken.length !==2) {
        return res.status(400).json({
            error: "Bearer token is malformed"
        })
    }

    const token = splitBearerToken[1];

//Verify the JWT, then add the user id to the request
    
    jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    error: "Invalid JWT"
                })
            }

            req.userId = decoded.id;
            next();
        }
    )
};

