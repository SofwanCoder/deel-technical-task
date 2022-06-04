import {
  BelongsTo,
  Column,
  DataType, ForeignKey, HasMany,
  Model, PrimaryKey,
  Table,
} from "sequelize-typescript";
import {Profile} from "./Profile";
import Job from "./Job";

export interface IContractAttributes {
  id: number;
  terms: string;
  status: "new" | "in_progress" | "terminated";
  ClientId: number;
  ContractorId: number;
}

export type IContractCreationAttributes = Partial<IContractAttributes>;

@Table({ tableName: "Contract" })
export default class Contract extends Model<
  IContractAttributes,
  IContractCreationAttributes
> {

  @PrimaryKey
  @Column
  public id!: number;

  @Column
  public terms!: string;

  @Column(DataType.ENUM("new", "in_progress", "terminated"))
  public status!: string;

  @ForeignKey(() => Profile)
  @Column
  public ClientId!: number;

  @ForeignKey(() => Profile)
  @Column
  public ContractorId!: number;

  @BelongsTo(() => Profile, {
    as: "Client",
  })
  public Client!: Profile;

  @BelongsTo(() => Profile, {
    as: "Contractor",
  })
  public Contractor!: Profile;

  @HasMany(() => Job)
  public Job!: Job[];

  public toJSON() {
    const { terms, status, Client, Contractor, Job } = this;
    return { terms, status,  Client, Contractor, Job };
  }
}
