import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient({
    socket: {
      host: "localhost",
      port: 6381,
    },
  });
(async function connectRedis(){
    try{
        await client.connect();
    }catch(err){
        console.error("redis ki error>>>>",err);
    }
})()

app.post("/submit", (req, res) => {
  const { problemId, userId, code, language } = req.body;
  client.lPush(
    "submissions",
    JSON.stringify({ problemId, userId, code, language })
  );
  res.json({
    message: "Submission received!",
  });
});

app.listen(3000, () => {
  console.log(">>>>server started");
});
