
const isAuthenticated = (req, res, next) => {
    return res.status(401).json('You do not have access');

next();
};
module.exports = {
     isAuthenticated
    };