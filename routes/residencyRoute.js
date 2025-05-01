import express from 'express';
import { createResidency,deleteResidency, getAllResidencies, getResidency} from '../controllers/resdCntrl.js';
const router = express.Router();

router.post("/create",createResidency)
router.get("/allresd", getAllResidencies)
router.get("/:id", getResidency)
router.delete("/delete/:id", deleteResidency); // 👈 DELETE endpoint


export {router as residencyRoute};