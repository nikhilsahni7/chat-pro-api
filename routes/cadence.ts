import express from "express";
import { CadenceService } from "../services/cadenceService";
import { ChatProService } from "../services/ChatProService";
import logger from "../utils/logger";

const cadenceRouter = express.Router();
const cadenceService = new CadenceService();
const chatProService = new ChatProService();

cadenceRouter.post("/trigger", async (req, res) => {
  try {
    const { customerId, messageType } = req.body;
    if (!customerId || !messageType) {
      logger.warn("Missing required information for cadence message", {
        body: req.body,
      });
      return res.status(400).json({ error: "Missing required information" });
    }
    const message = await cadenceService.triggerMessage(
      customerId,
      messageType
    );
    const customer = await cadenceService.getCustomer(customerId);
    await chatProService.sendMessage(customer.phoneNumber, message);
    logger.info("Cadence message triggered and sent", {
      customerId,
      messageType,
    });
    return res.json({
      message: "Cadence message triggered",
      messageId: message.id,
    });
  } catch (error) {
    logger.error("Error triggering cadence message", {
      error,
      customerId: req.body.customerId,
    });
    res.status(500).json({ error: "Internal server error" });
  }
});

export { cadenceRouter };
