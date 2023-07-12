import "dotenv/config";
import dotenv from "dotenv";
import app from "./core/config/app.config";

dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
