module.exports = (acyncFn) => {
    return (res, req, next) => {
        acyncFn(req, res, next).catch((err) => {
            next(err);
        })
    }
}