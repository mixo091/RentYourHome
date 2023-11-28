import express from "express";
import { createReservation, getAllReservations, getAvailability, getUserReservations} from '../controllers/reservations.js'

const router = express.Router();

router.post('/createReservation', createReservation);
router.get('/getAllReservations', getAllReservations);
router.get('/getUserReservations', getUserReservations);
router.get('/getAvailability', getAvailability);

export default router