import { describe, expect, test } from "vitest";
import supertest from "supertest";
import app from "./app";

describe("Root router tests", () => {
  let response: supertest.Response;

  test("should return status code", async () => {
    response = await supertest(app.callback()).get("/");

    expect(response.statusCode).toEqual(200);
  });

  test("should return a message in the response body", async () => {
    response = await supertest(app.callback()).get("/");

    expect(response.body.message).toEqual("GraphQL API");
  });
});
