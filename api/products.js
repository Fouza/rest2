import { Router } from "express";
import { productsCollection, usersCollection } from "../models/index.js";

export default ({ config, db }) => {
    let router = Router()


    // Method, URL
    // app.get('/', (req, res) => {
    //     console.log('Hello')
    //     res.send("Response")
    // })

    // GET, POST, DELETE, UPDATE, PUT


    //  api/products
    router.get('/', async (req, res) => {
        //Read
        //body, params, query
        // {
        //     skip: 10,
        //     limit: 10
        // }
        const { skip, limit } = req.query

        const options = {}
        if (skip) {
            options.skip = skip
        }
        if (limit) {
            options.limit = limit
        }

        const products = await productsCollection.find({}, 'username age', options) // {} {skip:10} {limit: 10} {skip: 10, limit: 10}
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

    // api/products/product_id

    router.get('/:product_id', async (req, res) => {
        const test = req.query
        const product = await productsCollection.findById(req.query.product_id,)
    })

    //Retrive all product that have price > 30 (30 can be a parameter)
    // /api/products/filter_by_price/ [0, 8888888888]
    // /api/products/filter_by_price/0
    // /api/products/filter_by_price/1
    // /api/products/filter_by_price/2
    // /api/products/filter_by_price/3
    // ....etc..
    router.get("/filter_by_price/:price", async (req, res) => {
        const { price } = req.params

        const result = await productsCollection.find({ price: { $gte: price } })
        if (result) {
            res.send({ success: true, response: result })
        } else {
            res.send({ success: false, message: "Try again" })
        }
    })

    router.get("/filter_by_price", async (req, res) => {
        const { price } = req.params
        const result = await productsCollection.find({ price: { $gte: price } })
        if (result) {
            res.send({ success: true, response: result })
        } else {
            res.send({ success: false, message: "Try again" })
        }
    })

    router.post('/create', async (req, res) => {
        const data = req.body //null or undefined or {}
    })

    router.post('/update', async (req, res) => {
        //Update
    })


    router.get('/test', async (req, res) => {
        const products = await productsCollection.aggregate([
            {
                $lookup: {
                    from: 'orders',
                    localField: '_id',
                    foreignField: 'products.product_id',
                    as: 'orders'
                }
            },

        ])
        res.send(products)
    })


    return router

}










// {
//     $project: {
//         name: 1, // include other fields you want from the 'products' collection
//             orders: {
//             $map: {
//                 input: '$orders',
//                     as: 'order',
//                             in: {
//                     // specify the fields from 'orders' that you want to include
//                     orderId: '$$order._id',  // example: include only the '_id' field
//                         orderDate: '$$order.orderDate'  // example: include orderDate field
//                 }
//             }
//         }
//     }
// },