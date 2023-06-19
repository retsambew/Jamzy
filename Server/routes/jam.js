import express from "express";
import { findPair } from "../controllers/jam.js";

const router = express.Router();

router.get("/", findPair);

export default router;
