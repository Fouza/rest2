const requestLogger = (req, res, next) => {
    console.log(`MIDDLEWARE 1 : ${req.method} ${req.url}`)

    //Verifies Sth
    //False

    res.send({ message: 'Stop right there !' })

    next();
}

export default requestLogger

export const containerRequestLogger = (req, res, next, text) => {
    console.log(text)
    return requestLogger(req, res, next)
}


