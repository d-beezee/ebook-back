import getFiles from "./getFiles";
import generateFirstPage from "./generateFirstPage";
const pdf2base64 = require("pdf-to-base64");
require("dotenv").config();
export default async () => {
  const ret = [];
  for await (const f of getFiles(process.env.PDF_FOLDER || "./pdf")) {
    if (f.file.endsWith(".pdf")) {
      const data: { path: string; preview?: string, dir?:string } = {
        path: f.file,
        dir: f.path,
      } 

      ret.push(data);
    }
  }
  return ret;
};
