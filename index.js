import express from "express";
import promClient from "prom-client";
const app = express();

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register: promClient.register });
app.get("/", (req, res) => {
  res.json({
    message: "hii working...",
  });
});

app.get("/slow", (req, res) => {
  res.json({
    message: "hiiii superr slow route",
  });
});

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", promClient.register.contentType);
  const metrics = await promClient.register.metrics();
  res.send(metrics);
});

app.listen(4000, () => console.log("sever running on 4000"));
