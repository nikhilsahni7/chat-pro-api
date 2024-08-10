import express from "express";
import { PropertyService } from "../services/propertyService";
import { AIService } from "../services/aiService";
import { ChatProService } from "../services/ChatProService";
import logger from "../utils/logger";

const propertyRouter = express.Router();
const propertyService = new PropertyService();
const aiService = new AIService();
const chatProService = new ChatProService();

propertyRouter.post("/info", async (req, res) => {
  try {
    const { propertyId, customerQuery, phoneNumber } = req.body;
    if (!propertyId || !customerQuery || !phoneNumber) {
      logger.warn("Missing required information for property info request", {
        body: req.body,
      });
      return res.status(400).json({ error: "Missing required information" });
    }
    const propertyInfo = await propertyService.getPropertyInfo(propertyId);
    const aiResponse = await aiService.generateResponse(
      customerQuery,
      propertyInfo
    );
    await chatProService.sendMessage(phoneNumber, aiResponse);
    logger.info("Property info retrieved and AI response sent", {
      propertyId,
      phoneNumber,
    });
    return res.json({ propertyInfo, aiResponse });
  } catch (error) {
    logger.error("Error processing property info request", {
      error,
      propertyId: req.body.propertyId,
    });
    res.status(500).json({ error: "Internal server error" });
  }
});

export { propertyRouter };
