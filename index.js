import express from 'express'
import CONFIG from './config.json' assert {type: 'json'}
import mongoose from 'mongoose'
import containerRequestLogger from './middlewares/requestLogger.js'
import { usersCollection } from './models/index.js'
import users from './api/users.js'
import api from './api/index.js'
import requestLogger from './middlewares/requestLogger.js'
import cors from 'cors'
//CommonJS and ES6

const app = express()
const PORT = CONFIG.port || 8000

app.use(cors({
    origin: CONFIG.corsOrigin,
    optionsSuccessStatus: 200,
}));

mongoose
    .connect(CONFIG.mongo_url)
    .then((db) => {
        console.log("Connected to the database");
        app.use(express.json());

        // app.use((req, res, next) => containerRequestLogger(req, res, next, X));

        app.use(requestLogger)

        app.use('/api', api({ config: CONFIG, db }))


        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err, "Received an Error");
    });


// rs commande => restart server
