const express = require("express");
const router = express.Router();

const { bookings } = require("./data");

router.post("/bookings", (req, res) => {
  const { destinationId, customerName, ticketQuantity } = req.body;

  if (
    !destinationId ||
    !customerName ||
    !ticketQuantity ||
    ticketQuantity < 1
  ) {
    return res.status(400).json({ message: "Data pemesanan tidak valid" });
  }

  const booking = {
    id: bookings.length + 1,
    destinationId,
    customerName,
    ticketQuantity,
    timestamp: new Date(),
  };

  bookings.push(booking);
  res.status(201).json({ message: "Pemesanan berhasil", booking });
});

module.exports = router;
