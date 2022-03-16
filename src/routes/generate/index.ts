import { Express, Request, Response } from "express";
import File from "@db/models/file";
import Path from "@db/models/path";

import returnPdfs from "./returnPdfs";
import generatePathTags from "./generatePathTags";
import generateFirstPage from "./generateFirstPage";
const pdf2base64 = require("pdf-to-base64");

export default (app: Express) => {
  app.get("/generate", async (req: Request, res: Response) => {
    const files = await returnPdfs();
    const current = await File.findAll();
    for (const c of current) {
      if (!files.find((f) => f.path === c.path)) {
        await c.destroy();
      }
    }
    for (const f of files) {
      if (!current.find((c) => c.path === f.path)) {
        const base64 = await pdf2base64(f.path)
        const preview =await generateFirstPage(f.path);

        const path = f.dir ? await generatePathTags(f.dir) : null;
        await File.create(
          {
            path: f.path,
            base64: base64,
            preview: preview ? preview : undefined,
            folder: path ? path.id : undefined,
          }
        );
      }
    }
    res.send("Hello World!");
  });
};
