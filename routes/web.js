import express from "express";
const router = express.Router();
import { homeCont } from "../controllers/homeCont.js";
import { servicesCont } from "../controllers/servicesCont.js";
import { skillCont } from "../controllers/skillCont.js";
import { contactCont } from "../controllers/contactCont.js";
router.get("/", homeCont);
router.get("/services", servicesCont);
router.get("/skill", skillCont);
router.get("/contact", contactCont);

export default router;
