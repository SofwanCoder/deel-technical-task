import {Route, SuccessResponse, Tags, Get, Path, Inject, Security, Post} from "tsoa";
import { success } from "../utils/response";
import AdminService from "../services/AdminService";

@Route("/admin")
@Security("ApiKeyAuth")
@Tags("Admin")
class AdminController {
  @SuccessResponse("200", "Successful")
  @Get("/best-profession")
  public static async getBestProfession() {
    return success(await AdminService.getBestProfession());
  }

  @SuccessResponse("200", "Successful")
  @Get("/best-clients")
  public static async getBestClient() {
    return success(await AdminService.getBestClient());
  }
}

export default AdminController;
