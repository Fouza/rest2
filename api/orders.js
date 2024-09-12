import { Router } from "express";
import { ordersCollection, usersCollection } from "../models/index.js";

export default ({ config, db }) => {
    let router = Router()


    // app.get('/', (req, res) => {
    //     console.log('Hello')
    //     res.send("Response")
    // })

    router.get('/', async (req, res) => {
        //Read

        const orders = await ordersCollection.find()
        if (orders) {
            res
                .status(200)
                .json(orders)
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


    router.get('/test', async (req, res) => {
        const orders = await ordersCollection.aggregate([
            {
                $unwind: '$products'
            }
        ])

        res.send({ orders })
    })


    return router

}