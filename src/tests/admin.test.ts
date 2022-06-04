import request from "supertest";
import { app } from "../app";
import {model} from "../model";

beforeAll(async () => {
  await model.sync();
});

describe("Admin Tests", () => {
  test("Return a profession that earned the most money", async () => {
    return request(app)
      .get("/admin/best-profession")
      .expect(200);
  });

  test("return the client that paid the most for jobs", async () => {
    return request(app)
      .get("/admin/best-clients")
      .expect(200);
  });

});
