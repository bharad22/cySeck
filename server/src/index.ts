import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware";
import { PORT } from "./utils/constants";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.text({ type: "text/plain" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (
    req.headers["content-type"]?.includes("text/plain") &&
    typeof req.body === "string"
  ) {
    try {
      req.body = JSON.parse(req.body);
    } catch (e) {}
  }
  next();
});

app.use("/", routes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
