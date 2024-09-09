import { Router } from "express";
import { productsCollection, usersCollection } from "../models/index.js";

export default ({ config, db }) => {
    let router = Router()


    // app.get('/', (req, res) => {
    //     console.log('Hello')
    //     res.send("Response")
    // })

    router.get('/', async (req, res) => {
        //Read
        const products = await productsCollection.find()
        if (products) {
            res
                .status(200)
                .json(products)
        } else {
            res
                .status(500)
                .json({ message: 'try again' })
        }
    })

    router.post('/create', async (req, res) => {

    })

    router.post('/update', async (req, res) => {
        //Update
    })



    return router

}