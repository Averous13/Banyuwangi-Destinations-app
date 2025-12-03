import express from "express";
import DestinationController from "../controllers/DestinationController.js"



const router = express.Router();

router.post('/', DestinationController.createDestination);
router.get('/', DestinationController.getAllDestination);
router.get('/:id', DestinationController.getDestinationById);
router.put('/:id', DestinationController.updateDestination);
router.delete('/:id', DestinationController.deleteDestinations);

export default router