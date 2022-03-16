import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "..";
import Path, {PathCreationAttributes} from "../path";


interface FileAttributes {
  id: number;
  path: string;
  base64: string;
  current?: number;
  preview?: string;
  folder?:number
}

/*
  We have to declare the FileCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface FileCreationAttributes extends Optional<FileAttributes, "id"> {}

interface FileInstance
  extends Model<FileAttributes, FileCreationAttributes>,
    FileAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const File = sequelize.define<FileInstance>("File", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  path: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  base64: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  preview: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  current: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER,
  },
});
File.belongsTo(Path, { foreignKey: "folder" });

export default File;

export type {FileInstance, FileAttributes, FileCreationAttributes};