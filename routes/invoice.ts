import express from "express";
import { InvoiceService } from "../services/invoiceService";
import { ChatProService } from "../services/ChatProService";
import logger from "../utils/logger";

const invoiceRouter = express.Router();
const invoiceService = new InvoiceService();
const chatProService = new ChatProService();

invoiceRouter.post("/request", async (req, res) => {
  try {
    const { customerId, phoneNumber } = req.body;
    if (!customerId || !phoneNumber) {
      logger.warn("Missing required information for invoice request", {
        body: req.body,
      });
      return res.status(400).json({ error: "Missing required information" });
    }
    const isValidCustomer = await invoiceService.verifyCustomer(
      customerId,
      phoneNumber
    );
    if (!isValidCustomer) {
      logger.warn("Invalid customer data for invoice request", {
        customerId,
        phoneNumber,
      });
      return res.status(400).json({ error: "Invalid customer data" });
    }
    const invoiceUrl = await invoiceService.generateAndSendInvoice(customerId);
    await chatProService.sendMessage(
      phoneNumber,
      `Your invoice is ready: ${invoiceUrl}`
    );
    logger.info("Invoice generated and sent", { customerId, phoneNumber });
    return res.json({ message: "Invoice sent", invoiceUrl });
  } catch (error) {
    logger.error("Error processing invoice request", {
      error,
      customerId: req.body.customerId,
    });
    res.status(500).json({ error: "Internal server error" });
  }
});

export { invoiceRouter };
