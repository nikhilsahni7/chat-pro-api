import express from "express";

import { chatProRouter } from "./routes/chatPro";
import { imoviewRouter } from "./routes/imoview";
import { invoiceRouter } from "./routes/invoice";
import { propertyRouter } from "./routes/property";
import { cadenceRouter } from "./routes/cadence";
import logger from "./utils/logger";
import { applyErrorHandler } from "./middlewares/errorHandler";

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

app.use("/chatpro", chatProRouter);
app.use("/imoview", imoviewRouter);
app.use("/invoice", invoiceRouter);
app.use("/property", propertyRouter);
app.use("/cadence", cadenceRouter);

applyErrorHandler(app);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
