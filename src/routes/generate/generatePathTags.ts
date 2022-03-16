import Path, { PathInstance } from "@db/models/path";

export default async (path: string) => {
  const parts = path.split("/");
  let parent: false | PathInstance = false;
  console.log(parts)
  for (let part of parts) {
    let parentId: number = parent ? parent.id : 0;

    const p = await Path.findOne({ where: { name: part, parent: parentId } });
    if (!p) {
      parent = await Path.create({ name: part, parent: parentId });
    } else {
      parent = p;
    }
  }
  if (parent && parent.id) {
    return parent;
  }
  return false;
};
