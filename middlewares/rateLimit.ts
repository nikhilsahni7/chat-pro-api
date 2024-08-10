// // src/middleware/rateLimit.ts
// import { Elysia } from "elysia";
// import { rateLimit } from "@elysiajs/rate-limit";

// export const applyRateLimit = (app: Elysia): void => {
//   app.use(
//     rateLimit({
//       max: 100, // max requests
//       time: 60 * 1000, // per 1 minute
//     })
//   );
// };
