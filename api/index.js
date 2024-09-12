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

// TO retrieve all products where one of his tags is 'Electronic'
// => Retrieve all products with specific tag
//get all users that have 2 orders and more
// get all orders that have a product with quantity > 2
// Create an new product named Headphones
//Get all products that have stocked false