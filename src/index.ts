import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
const app = express();
app.use(cors());
app.use(express.json());

routes(app)

const start = async () => {
  app.listen(3001, () => {
    console.log("Example app listening on port 3000!");
  });
};
start();
