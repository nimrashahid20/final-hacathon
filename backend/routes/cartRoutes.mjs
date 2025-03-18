import express from "express";
const router = express.Router();
import tokenVerification from "../config/tokenVerification.mjs";
import {
  getCart
} from "../controller/cartController.mjs";

router.get("/",tokenVerification,getCart);

export default router