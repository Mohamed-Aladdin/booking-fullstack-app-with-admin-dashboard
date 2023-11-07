import express from "express";
import {
  createRoom,
  getRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../config/verifyToken.js";

const router = express.Router();

router.post("/:hotelId", verifyAdmin, createRoom);
router.get("/", getRooms);
router.get("/:id", getRoom);
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

export { router as roomRouter };
