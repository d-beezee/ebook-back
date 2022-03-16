import { Express, Request, Response } from "express";
import Path, { PathAttributes } from "@db/models/path";
import File from "@db/models/file";

export default (app: Express) => {
  app.delete("/paths/:id", async (req: Request, res: Response) => {
    File.update({
        folder: 0,
    }, {
        where: {
            folder: req.params.id,
        }
    })
    Path.destroy({
        where: {
            id: req.params.id,
        }
    })
    res.send("Deleted!");
  })
}