const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const Models = require("../models/index")

module.exports = {

    verifyToken: async (req, res, next) => {
        const token = req.headers["authorization"];
        if (token && token.startsWith("Bearer ")) {
            const actualToken = token.split(" ")[1];
            console.log("actualToken", actualToken);
            jwt.verify(actualToken, secretKey, async (err, authData) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid token!" });
                }
                let userDetail = await Models.userModel.findOne({
                    where: {
                        id: authData.id
                    }, raw: true
                })
                req.user = userDetail;
                next();
            });
        } else {
            return res.status(403).json({ message: "Token is not provided!" });
        }
    }

}
