import { Router } from "express";
import { usersCollection } from "../models/index.js";
import requestLogger from "../middlewares/requestLogger.js";

export default ({ config, db }) => {
    let router = Router()

    // app.get('/', (req, res) => {
    //     console.log('Hello')
    //     res.send("Response")
    // })

    //body, params, query

    //Fetch users in DB with filter
    router.get('/filter', async (req, res) => {
        // req.body
        // req.params
        // req.query
        // const { search_term } = req.params
        const { search_term, age, nb_order } = req.query
        console.log(search_term, age)

        //Read
        // const users = await usersCollection.find() // Fetch All users
        const users = await usersCollection.find({
            ...search_term && { username: { $regex: search_term } },
            ...age && { age: { $gte: age } },
            ...nb_order && { orders: { $size: nb_order } }
        }, 'username age orders')

        // const users = await usersCollection.find({ username: { $regex: search_term }, age: { $gte: 20 } }, 'username age', { skip: 5, limit: 1 })

        if (users) {
            res
                .send({ success: true, users: users })
        } else {
            res
                .send({ success: false, message: 'Server Error' })
        }
    })

    //exo2
    //Get all users that have X orders OR more
    //Get all users that have only 1 order
    // router.get('/ordernum', async (req, res) => {
    //     const user = await usersCollection.find({
    //         $and: [
    //             { "orders.1": { $exists: 0 } },
    //             { "orders.0": { $exists: 1 } }
    //         ]
    //     })
    //     res.send({ success: true, user: user });
    // })


    //  /api/users/create
    router.post('/', async (req, res) => {
        const body = req.body
        console.log(body)
        if (body.username && body.age && body.email) {
            const user = await usersCollection.create(body)
            if (user) {
                res.send({ success: true, message: "User created successfully", user: user })
            } else {
                res.send({ success: false, message: "Try again" })
            }
        } else {
            res.send({ success: false, message: 'Please send user information' })
        }
    })

    router.put('/', async (req, res) => {
        const body = req.body
        const newUpdate = await usersCollection.updateOne({ email: body.email }, { username: body.username, age: body.age })
        if (newUpdate) {
            res.send({ success: true, user: newUpdate })
        } else {
            res.send({ success: false, message: 'Server Error' })
        }
    })

    router.put('/update_many', async (req, res) => {
        const body = req.body
        const newUpdate = await usersCollection.updateMany({ username: { $regex: body.username } }, { age: body.age })
        if (newUpdate) {
            res.send({ success: true, user: newUpdate })
        } else {
            res.send({ success: false, message: 'Server Error' })
        }
    })


    //Test virtuals
    router.post('/test_lastname', async (req, res) => {
        const body = req.body
        if (body.username && body.age && body.email) {
            const user = new usersCollection(body)
            console.log(user, user.toJSON())
            if (user) {
                // res.send({ success: true, message: "User created successfully", user: user, fullName: user.fullName })
                res.send({ user: user, jsonUser: user.toJSON({ virtuals: true }) })

            } else {
                res.send({ success: false, message: "Try again" })
            }
        } else {
            res.send({ success: false, message: 'Please send user information' })
        }
    })

    router.post('/test_setter', async (req, res) => {
        const body = req.body
        if (body.username && body.age && body.email) {
            const user = new usersCollection(body)
            if (user) {
                // res.send({ success: true, message: "User created successfully", user: user, fullName: user.fullName })
                res.send({ user: user, jsonUser: user.toJSON({ virtuals: true }) })

            } else {
                res.send({ success: false, message: "Try again" })
            }
        } else {
            res.send({ success: false, message: 'Please send user information' })
        }
    })

    //get all users that have 2 orders and more
    //AND at least one of the orders
    //has a product with qty >= 2
    router.get('/users_with_orders', async (req, res) => {
        const users = await usersCollection.aggregate([
            {
                $lookup: {
                    // jointure de users and orders key=user en commun
                    from: "orders",
                    localField: "_id",
                    foreignField: "user",
                    as: "newfield", //nv nom joined collections
                },
            },
            {
                $match: {
                    $and: [
                        { "newfield.1": { $exists: true } }, // au moins 2 orders
                        { "newfield.products.quantity": { $gte: 2 } }, //  product with qty >= 2
                    ],
                },
            },
            {
                $project: {
                    username: 1,
                    newfield: 1
                }
            }
        ]);
        res.send({ users })
    })

    router.get('/test2', async (req, res) => {
        const users = await usersCollection.aggregate([
            {
                $lookup: {
                    // jointure de users and orders key=user en commun
                    from: "orders",
                    localField: "_id",
                    foreignField: "user",
                    as: "newfield", //nv nom joined collections
                },
            },
            {
                $project: {
                    username: 1,
                    'newfield.order_id': 1
                }
            },
            // {
            //     $unwind: '$newfield' // Deconstruct
            // }
        ]);
        res.send({ users })
    })

    return router

}

