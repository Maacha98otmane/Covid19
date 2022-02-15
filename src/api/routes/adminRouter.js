import express from "express";
const router = express.Router();


import {
    SearchUser,
    storeAdult
} from "../controllers"

// import {
//     CreatUserValidator,
// } from "../middlewares"

router.post("/SearchUser", SearchUser)
router.post("/storeAdult", storeAdult)

export { router }