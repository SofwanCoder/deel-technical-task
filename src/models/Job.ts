import {
  BelongsTo,
  Column,
  DataType, ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Contract from "./Contract";

export interface IJobAttributes {
  id: number;
  description: string;
  price: number;
  paid: boolean;
  paymentDate: Date | string;
  ContractId: number;
}

export type IJobCreationAttributes = Partial<IJobAttributes>;

@Table({ tableName: "Job" })
export default class Job extends Model<
  IJobAttributes,
  IJobCreationAttributes
> {

  @Column(DataType.TEXT)
  public description!: string;

  @Column(DataType.DECIMAL(12, 2))
  public price!: number;

  @Column(DataType.BOOLEAN)
  public paid!: boolean;

  @ForeignKey(() => Contract)
  @Column
  public ContractId!: number;

  @Column(DataType.DATE)
  public paymentDate!: Date;

  @BelongsTo(() => Contract)
  public Contract!: Contract;


  public toJSON() {
    const { id, description, price, paid, paymentDate } = this;
    return { id, description, price, paid, paymentDate };
  }
}
