import { Router } from "express";
import { usersCollection } from "../models/index.js";

export default ({ config, db }) => {
    let router = Router()


    // app.get('/', (req, res) => {
    //     console.log('Hello')
    //     res.send("Response")
    // })

    //body, params, query

    //Fetch users in DB
    router.get('/:search_term', async (req, res) => {
        // req.body
        // req.params
        // req.query
        const { search_term } = req.params
        const { age } = req.query
        console.log(search_term, age)

        //Read
        // const users = await usersCollection.find() // Fetch All users
        const users = await usersCollection.find({ username: { $regex: search_term }, ...age && { age: { $gte: age } } }, 'username age')

        // const users = await usersCollection.find({ username: { $regex: search_term }, age: { $gte: 20 } }, 'username age', { skip: 5, limit: 1 })

        if (users) {
            res
                .send({ success: true, users: users })
        } else {
            res
                .send({ success: false, message: 'Server Error' })
        }
    })


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

    return router

}