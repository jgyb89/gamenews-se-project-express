require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
// Note: routes, error-handler, logger, and rateLimiter will be created in subsequent steps
const routes = require("./routes");
// const errorHandler = require("./middlewares/error-handler");
// const { requestLogger, errorLogger } = require("./middlewares/logger");
// const limiter = require("./middlewares/rateLimiter");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/gamenews_db").catch(() => {
  // eslint-disable comments are forbidden. Handle errors properly or exit without console bypassing.
  process.exit(1);
});

app.use(cors());
app.use(helmet());
// app.use(limiter);

app.use(express.json());

// app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use("/", routes);

// app.use(errorLogger); 
app.use(errors());
// app.use(errorHandler);

app.listen(PORT);
