import {Route, SuccessResponse, Tags, Get, Path, Inject, Security, Post} from "tsoa";
import { success } from "../utils/response";
import {Profile} from "../models/Profile";
import JobService from "../services/JobService";

@Route("/jobs")
@Security("ApiKeyAuth")
@Tags("Jobs")
class JobController {
  @SuccessResponse("200", "Successful")
  @Get("/unpaid")
  public static async getUnpaidJobs(@Inject() profile: Profile) {
    return success(await JobService.getUnpaidJobs(profile));
  }

  @SuccessResponse("200", "Successful")
  @Post(":jobId/pay")
  public static async payForJob(@Inject() profile: Profile, @Path() jobId: string) {
    return success(await JobService.payJob(profile, jobId));
  }
}

export default JobController;
