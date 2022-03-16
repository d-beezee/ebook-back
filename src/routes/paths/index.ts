import { Express, Request, Response } from "express";
import Path from "@db/models/path";

export default (app: Express) => {
  app.get("/paths", async (req: Request, res: Response) => {
    let data;
    try {
      data = await Path.findAll({
      });
    } catch (error) {
      console.log(error);
    }
    res.send(data);
  });
};
