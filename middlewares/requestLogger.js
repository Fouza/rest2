const requestLogger = (req, res, next) => {
    console.log(`MIDDLEWARE 1 : ${req.method} ${req.url}`)


    next();
}


const containerRequestLogger = (req, res, next, text) => {
    console.log(text)
    return requestLogger(req, res, next)
}


export default containerRequestLogger