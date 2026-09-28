const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("減肉肉教練正在運作中！");
});

app.post("/webhook", async (req, res) => {
  console.log("收到 LINE 訊息：", JSON.stringify(req.body));

  // 先告訴 LINE：Webhook 已成功收到
  res.sendStatus(200);

  const events = req.body.events || [];

  for (const event of events) {
    // 目前只處理文字訊息
    if (
      event.type === "message" &&
      event.message &&
      event.message.type === "text"
    ) {
      try {
        const response = await fetch(
          "https://api.line.me/v2/bot/message/reply",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
              replyToken: event.replyToken,
              messages: [
                {
                  type: "text",
                  text: "嗨！我是減肉肉教練 💪",
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("LINE 回覆失敗：", response.status, errorText);
        }
      } catch (error) {
        console.error("LINE 回覆發生錯誤：", error);
      }
    }
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
