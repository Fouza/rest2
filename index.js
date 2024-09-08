import express from 'express'
import CONFIG from './config.json' assert {type: 'json'}
import mongoose from 'mongoose'
//CommonJS and ES6

const app = express()
const PORT = CONFIG.port || 8000


mongoose
    .connect(CONFIG.mongo_url)
    .then((db) => {
        console.log("Connected to the database");
        app.use(express.json());


        app.get('/', (req, res) => {
            console.log('Hello')
            res.send("Response")
        })


        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err, "Received an Error");
    });




// rs commande => restart server
