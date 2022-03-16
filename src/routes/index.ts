import {Express} from "express";
import list from "./list";
import list_id from "./list/_id";
import list_id_patch from "./list/_id/_patch";
import generate from "./generate";
import clear from "./clear";
import paths from "./paths";
import paths_id from "./paths/_id";
import paths_id_delete from "./paths/_id/_delete";

export default (app: Express) => {
    list(app)
    list_id(app)
    clear(app)
    generate(app)
    list_id_patch(app)
    paths(app)
    paths_id(app)
    paths_id_delete(app)
}