import request from "supertest";
import { app } from "../app";
import {model} from "../model";

beforeAll(async () => {
  await model.sync();
});

describe("Balances Tests", () => {
  test("it should deposit successfully", async () => {
    return request(app)
      .post("/balances/deposit")
      .send({
        amount: 10,
      })
      .set("Profile_id", "1")
      .expect(200);
  });

  test("it should fail to deposit amount greater than 25% of all outstanding bill", async () => {
    return request(app)
      .post("/balances/deposit")
      .send({
        amount: 500000
      })
      .set("Profile_id", "1")
      .expect(409);
  });

});
