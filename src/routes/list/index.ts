import Path,{PathInstance} from "@db/models/path";
import { Express, Request, Response } from "express";
import { FindOptions } from "sequelize";
import File, {FileAttributes} from "@db/models/file";

export default (app: Express) => {
  app.get("/list", async (req: Request, res: Response) => {
    let data,results;
    try {
      let order: "ASC" | "DESC" = req.query.order === "DESC" ? "DESC" : "ASC";
      let orderBy =
        req.query.orderBy && typeof req.query.orderBy === "string"
          ? req.query.orderBy
          : "id";
      let attributes =
        req.query.attributes && typeof req.query.attributes === "string"
          ? req.query.attributes.split(",")
          : ["id", "path", "preview"];
      
      const conf: FindOptions<FileAttributes> = {
        attributes,
        order: [[orderBy, order]],
        limit:
          req.query.limit && typeof req.query.limit === "string"
            ? parseInt(req.query.limit)
            : undefined,
      }
      if (req.query.parent && typeof req.query.parent === "string") {
        conf.where = {
          folder: req.query.parent,
        };
      }

      data = await File.findAll(conf);
    } catch (error) {
      console.log(error);
    }
    res.send(data);
  });
};
