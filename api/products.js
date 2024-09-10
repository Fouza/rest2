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