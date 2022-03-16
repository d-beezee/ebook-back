import { Express, Request, Response } from "express";
import File from "../../../../db/models/file";

export default (app: Express) => {
  app.get("/list/:id", async (req: Request, res: Response) => {
    let data;
    try {
      data = await File.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "path","base64","current"],
      });
    } catch (error) {
      console.log(error);
    }
    res.send(data);
  });
};
