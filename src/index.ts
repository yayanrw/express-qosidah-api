import "dotenv/config";
import express from "express";
import router from "./routes";

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
