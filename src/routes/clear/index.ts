import { Express, Request, Response } from "express";
import File from "../../../db/models/file";
export default (app: Express) => {
  app.get("/clear", async (req: Request, res: Response) => {
    try {
      await File.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
    res.send("cleared");
  });
};
