import { Express, Request, Response } from "express";
import Path, { PathAttributes } from "@db/models/path";
import File from "@db/models/file";

export default (app: Express) => {
  app.get("/paths/:id", async (req: Request, res: Response) => {
    let data;
    let results: (PathAttributes & { children?: number, files?:number })[] = [];
    try {
      data = await Path.findAll({
        where: {
          parent: req.params.id,
        },
      });
      for (let d of data) {
        const i = { ...(d.get({ plain: true })), children: 0, files: 0 };
        i.children = await Path.count({
            where: {
                parent: i.id,
            },
        });
        i.files = await File.count({
            where: {
                folder: i.id,
            },
        });
        results.push(i);
      }
    } catch (error) {
      console.log(error);
    }
    res.send(results);
  });
};
