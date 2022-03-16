import { Express, Request, Response } from "express";
import File from "@db/models/file";

export default (app: Express) => {
  app.patch("/list/:id", async (req: Request, res: Response) => {
    let data;
    if (!req.body.current) return res.send("no data");
    try {
      await File.update(
        {
          current: req.body.current,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      data = await File.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "current"],
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    res.send(data);
  });
};
