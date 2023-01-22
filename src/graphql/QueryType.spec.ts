import { describe, expect, test } from "vitest";
import { graphql } from "graphql";
import schema from "./schema";

describe("GraphQL API queries tests", () => {
  test("should return hello query", async () => {
    const query = `
      query HelloQuery {
        hello
      }
    `;

    const response = await graphql({ schema, source: query });

    expect(response.data?.hello).toEqual("Hello from GraphQL API");
  });
});
