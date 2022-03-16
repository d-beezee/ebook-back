const {readdir} = require("fs").promises;
import { resolve } from   'path' ;

export default async function* getFiles(dir:string, paths?:string) : AsyncIterableIterator<{file:string,path?:string}> {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
      const res = resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        const p = paths ? `${paths}/${dirent.name}` : dirent.name;
        yield* getFiles(res,p);
      } else {
        yield {file:res, path:paths};
      }
    }
  }