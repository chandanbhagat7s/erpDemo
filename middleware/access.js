const appError = require("../utils/appError");


exports.giveAccessTo = function (...role) {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return next(new appError("you are not authorized to perform this task", 403));
        }
        next()
    }
}