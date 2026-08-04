require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { MONGO_URI } = require("./utils/config");
// Note: routes, error-handler, logger, and rateLimiter will be created in subsequent steps
const routes = require("./routes");
const errorHandler = require("./middlewares/error-handlers");
// const { requestLogger, errorLogger } = require("./middlewares/logger");
const limiter = require("./middlewares/rateLimiter");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect(MONGO_URI).catch(() => {
  // Exit if DB fails to connect. Handle errors properly without bypassing console.
  process.exit(1);
});

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(express.json());

// app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", routes);

// app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
