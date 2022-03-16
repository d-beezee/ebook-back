import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "..";

interface PathAttributes {
  id: number;
  name: string;
  parent: number;
}
interface PathCreationAttributes extends Optional<PathAttributes, "id"> {}

interface PathInstance
  extends Model<PathAttributes, PathCreationAttributes>,
    PathAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Path = sequelize.define<PathInstance>("Path", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  parent: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

export default Path;
export type {PathInstance, PathAttributes, PathCreationAttributes};