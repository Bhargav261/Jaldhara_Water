const jwt = require("jsonwebtoken");

const ValidateSignature = async (req) => {
    try {
        const signature = req.get("Authorization");
        if (signature) {
            const payload = jwt.verify(signature.split(" ")[1], process.env.JwtSecretKey);
            req.user = payload._id;
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("error :: ", error)
        return false;
    }
};

module.exports = async (req, res, next) => {

    const isAuthorized = await ValidateSignature(req);

    if (isAuthorized) {
        return next();
    }
    return res.status(403).json({ message: 'Not Authorized', status: false, status_code: 403 })
}