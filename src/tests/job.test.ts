import request from "supertest";
import { app } from "../app";
import {model} from "../model";

beforeAll(async () => {
  await model.sync();
  await model.query("UPDATE Job SET paid = false WHERE id = 2");
  await model.query("UPDATE Profile SET balance = 10000 WHERE id = 1");
});

describe("Job Tests", () => {
  test("it should fetch unpaid jobs", async () => {
    return request(app)
      .get("/jobs/unpaid")
      .set("Profile_id", "1")
      .expect(200);
  });

  test("it should pay unpaid job", async () => {
    return request(app)
      .post("/jobs/2/pay")
      .set("Profile_id", "1")
      .expect(200);
  });

  test("it should fail to pay already paid Job", async () => {
    return request(app)
      .post("/jobs/2/pay")
      .set("Profile_id", "1")
      .expect(410);
  });
});
