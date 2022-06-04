import {Profile} from "../models/Profile";
import {model} from "../model";
import ConflictException from "../exceptions/http/ConflictException";
import JobService from "./JobService";
import {DepositPayload} from "../types/payload";

export default class BalanceService {

  public static async deposit(profile: Profile, payload: DepositPayload) {
    // a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)

    const unpaidJobs = await JobService.getUnpaidJobs(profile);

    const totalAmount = unpaidJobs.reduce((acc, job) => acc + job.price, 0);

    if (payload.amount > totalAmount * 0.25) {
      throw new ConflictException('You can\'t deposit more than 25% of your total unpaid jobs');
    }
    // Transaction is not necessary in this case, because we're doing a single modification
    return model.transaction(async (t) => {
      await profile.increment("balance", {by: payload.amount, transaction: t});
    })
  }


}
