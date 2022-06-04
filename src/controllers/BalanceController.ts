import {Route, SuccessResponse, Tags, Inject, Security, Post, Body} from "tsoa";
import { success } from "../utils/response";
import {Profile} from "../models/Profile";
import BalanceService from "../services/BalanceService";
import {DepositPayload} from "../types/payload";

@Route("/balances")
@Security("ApiKeyAuth")
@Tags("Balances")
export default class BalanceController {
  @SuccessResponse("200", "Successful")
  @Post("/deposit")
  public static async depositAmount(@Inject() profile: Profile, @Body() payload: DepositPayload) {
    return success(await BalanceService.deposit(profile, payload));
  }
}

