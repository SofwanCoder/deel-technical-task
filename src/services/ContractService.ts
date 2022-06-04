import Contract from "../models/Contract";
import NotFoundException from "../exceptions/http/NotFoundException";
import {Op} from "sequelize";

export default class ContractService {
  public static async getContract(id: string) {

    const contract = await Contract.findByPk(id);

    if (!contract) {
      throw new NotFoundException("Contract not found");
    }

    return contract;

  }

  public static async getContracts(profileId: number) {

    return await Contract.findAll({
      where: {
        [Op.or]: {
          "ClientId": profileId,
          "ContractorId": profileId
        }
      }
    });

  }


}
