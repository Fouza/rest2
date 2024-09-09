import { Router } from "express";
import { usersCollection } from "../models/index.js";

export default ({ config, db }) => {
    let router = Router()


    // app.get('/', (req, res) => {
    //     console.log('Hello')
    //     res.send("Response")
    // })

    //Fetch all users in DB
    router.get('/', async (req, res) => {
        //Read
        const users = await usersCollection.find()
        if (users) {
            res
                .status(200)
                .json(users)
        } else {
            res
                .status(500)
                .json({ message: 'try again' })
        }
    })


    //  /api/users/create
    router.post('/create', async (req, res) => {
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

    router.post('/update', async (req, res) => {
        //Update
    })



    return router

}