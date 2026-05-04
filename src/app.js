const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const routes = require("./routes");
const { notFoundHandler, errorHandler } = require("./middleware/error-handler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "1mb", type: "*/*" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const eventBody = req.apiGateway?.event?.body;
  const hasEventBody = typeof eventBody === "string" && eventBody.length > 0;
  const numericKeyObject =
    req.body &&
    typeof req.body === "object" &&
    !Array.isArray(req.body) &&
    Object.keys(req.body).every((key) => /^\d+$/.test(key));

  if (!req.body || Buffer.isBuffer(req.body) || numericKeyObject) {
    if (hasEventBody) {
      const raw = req.apiGateway.event.isBase64Encoded
        ? Buffer.from(eventBody, "base64").toString("utf8")
        : eventBody;
      try {
        req.body = JSON.parse(raw);
      } catch (err) {
        req.body = raw;
      }
    }
  } else if (typeof req.body === "string" && req.body.trim().startsWith("{")) {
    try {
      req.body = JSON.parse(req.body);
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON body" });
    }
  }

  next();
});

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.set("trust proxy", 1); 

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    skip: (req) => req.path.startsWith("/api/docs")
  })
);

app.get("/", (req, res) => {
  res.json({ name: "TukTuk Tracking API", docs: "/api/docs", health: "/api/health" });
});

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
