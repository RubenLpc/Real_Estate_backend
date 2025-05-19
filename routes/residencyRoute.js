import express from 'express';
import { createResidency,deleteResidency, getAllResidencies, getAvailableResidencies, getResidency, updateResidency} from '../controllers/resdCntrl.js';
const router = express.Router();

router.post("/create",createResidency)
router.get("/allresd", getAllResidencies)
router.get("/allresdav", getAvailableResidencies)
router.get("/:id", getResidency)
router.delete("/delete/:id", deleteResidency); // 👈 DELETE endpoint
router.put("/update/:id", updateResidency);


export {router as residencyRoute};