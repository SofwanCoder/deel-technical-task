import {Route, SuccessResponse, Tags, Get, Path, Inject, Security} from "tsoa";
import ContractService from "../services/ContractService";
import { success } from "../utils/response";
import {Profile} from "../models/Profile";

@Route("/contracts")
@Security("ApiKeyAuth")
@Tags("Contracts")
class ContractController {
  @SuccessResponse("200", "Successful")
  @Get("/")
  public static async getContracts(@Inject() profile: Profile) {
    return success(await ContractService.getContracts(profile.id));
  }

  @SuccessResponse("200", "Successful")
  @Get(":contractId")
  public static async getContract(@Path() contractId: string) {
    return success(await ContractService.getContract(contractId));
  }
}

export default ContractController;
