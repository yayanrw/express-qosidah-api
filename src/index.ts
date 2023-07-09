import "dotenv/config";
import express from "express";
import router from "./routes";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
