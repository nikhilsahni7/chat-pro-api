import express from "express";
import { ImoviewService } from "../services/imoviewService";
import { ChatProService } from "../services/ChatProService";
import logger from "../utils/logger";

const imoviewRouter = express.Router();
const imoviewService = new ImoviewService();
const chatProService = new ChatProService();

imoviewRouter.post("/new-service", async (req, res) => {
  try {
    const { customerId } = req.body;
    if (!customerId) {
      logger.warn("Missing customerId for new service", { body: req.body });
      return res.status(400).json({ error: "Missing customerId" });
    }
    const customer = await imoviewService.getCustomer(customerId);
    const whatsappService = await chatProService.createNewService(
      customer.phoneNumber
    );
    logger.info("New WhatsApp service created", {
      customerId,
      serviceId: whatsappService.id,
    });
    return res.json({
      message: "New WhatsApp service created",
      serviceId: whatsappService.id,
    });
  } catch (error) {
    logger.error("Error creating new WhatsApp service", {
      error,
      customerId: req.body.customerId,
    });
    res.status(500).json({ error: "Internal server error" });
  }
});

export { imoviewRouter };
