const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("減肉肉教練正在運作中！");
});

app.post("/webhook", (req, res) => {
  console.log("收到 LINE 訊息：", JSON.stringify(req.body));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
