import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  PrimaryKey,
} from "sequelize-typescript";
import Contract from "./Contract";
import {ProfileType} from "../types/enums/profile.enums";

export interface IProfileAttributes {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  balance: number;
  type: ProfileType | string;
}

export type IProfileCreationAttributes = Partial<IProfileAttributes>;

@Table({ tableName: "Profile" })
export class Profile extends Model<IProfileAttributes, IProfileCreationAttributes> {
  @PrimaryKey
  @Column
  public id!: number;

  @Column
  public firstName!: string;

  @Column
  public lastName!: string;

  @Column
  public profession!: string;

  @Column(DataType.DECIMAL(12, 2))
  public balance!: number;

  @Column(DataType.ENUM(...Object.values(ProfileType)))
  public type!: ProfileType;

  @HasMany(() => Contract, {
    foreignKey: "ContractorId",
  })
  public Contractor!: Contract[];

  @HasMany(() => Contract, {
    foreignKey: "ClientId",
  })
  public Client!: Contract[];

  public toJSON() {
    const { firstName, lastName, profession, balance, type } = this;
    return {
      firstName, lastName, profession, balance, type
    };
  }
}
