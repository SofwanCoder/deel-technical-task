
import request from "supertest";
import { app } from "../app";
import {model} from "../model";

beforeAll(async () => {
  await model.sync();
});
describe("Contract Tests", () => {
  test("it should fetch all contract", async () => {
    return request(app)
      .get("/contracts")
      .set("Profile_id", "1")
      .expect(200);
  });

  test("it should get a single contract", async () => {
    return request(app)
      .get("/contracts/1")
      .set("Profile_id", "1")
      .expect(200);
  });

  test("it should fail to fetch contracts", async () => {
    return request(app)
      .get("/contracts")
      .expect(401);
  });

  test("it should fail to fetch single contract", async () => {
    return request(app)
      .get("/contracts/1")
      .expect(401);
  });
});
