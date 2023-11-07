import express from "express";
import {
  createHotel,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../config/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel);
router.get("/find/:id", getHotel);
router.get("/", getHotels);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export { router as hotelRouter };
