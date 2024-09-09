import { Router } from "express"
import product from "./products.js";
import user from "./users.js";
import order from "./orders.js";

export default ({ config, db }) => {
    let api = Router();

    api.use('/products', product({ config, db }))

    api.use('/users', user({ config, db }))

    api.use('/orders', order({ config, db }))

    return api
}