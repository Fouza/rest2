import express from 'express'
import CONFIG from './config.json' assert {type: 'json'}
import mongoose from 'mongoose'
import containerRequestLogger from './middlewares/requestLogger.js'
import { usersCollection } from './models/index.js'
//CommonJS and ES6

const app = express()
const PORT = CONFIG.port || 8000

var X = "test"
mongoose
    .connect(CONFIG.mongo_url)
    .then((db) => {
        console.log("Connected to the database");
        app.use(express.json());

        // app.use((req, res, next) => containerRequestLogger(req, res, next, X));

        app.get('/', (req, res) => {
            console.log('Hello')
            res.send("Response")
        })


        app.post('/users', async (req, res) => {
            const body = req.body
            console.log(body)
            if (body.username && body.age && body.email) {
                const user = await usersCollection.create(body)
                if (user) {
                    res.send({ success: true, message: "User created successfully" })
                } else {
                    res.send({ success: false, message: "Try again" })
                }
            } else {
                res.send({ success: false, message: 'Please send user information' })
            }
        })


        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err, "Received an Error");
    });




// rs commande => restart server
