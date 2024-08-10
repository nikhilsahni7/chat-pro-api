import express from "express";
import { ChatProService } from "../services/ChatProService";
import { ImoviewService } from "../services/imoviewService";
import logger from "../utils/logger";

const chatProRouter = express.Router();
const chatProService = new ChatProService();
const imoviewService = new ImoviewService();

chatProRouter.post("/webhook", async (req, res) => {
  try {
    const { fullName, email, phoneNumber } = req.body;
    if (!fullName || !email || !phoneNumber) {
      logger.warn("Missing required customer information", { body: req.body });
      return res
        .status(400)
        .json({ error: "Missing required customer information" });
    }
    const customerId = await imoviewService.createCustomer({
      fullName,
      email,
      phoneNumber,
    });
    await chatProService.sendMessage(
      phoneNumber,
      `Welcome ${fullName}! Your account has been created.`
    );
    logger.info("Customer created and welcomed", { customerId, phoneNumber });
    return res.json({ message: "Customer created", customerId });
  } catch (error) {
    logger.error("Error in chatPro webhook", { error });
    res.status(500).json({ error: "Internal server error" });
  }
});

export { chatProRouter };
