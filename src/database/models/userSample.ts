import { Models, User } from '../../types';
import { Model, Sequelize, DataTypes, Optional } from 'sequelize';

interface UserCreationAttributes extends Optional<User, 'id'> {}

interface UserInstance extends Model<User, UserCreationAttributes>, User {}

export default function UserModel(sequelize: Sequelize) {
  const user = sequelize.define<UserInstance>(
    'users',
    {
      id: {
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: {
            args: 4,
            msg: 'id must be uuid',
          },
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      paranoid: true,
    }
  );

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // @ts-ignore
  user.associate = function (models: Models) {
    // associations can be defined here
    // e.g models.user.hasMany(models.accounts);
  };

  return user;
}
