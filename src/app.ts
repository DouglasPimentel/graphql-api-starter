import Koa from "koa";
import Router from "koa-router";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from "graphql-helix";
import { ExecutionResult, GraphQLError, GraphQLErrorOptions } from "graphql";
import logger from "./middlewares/logger";
import schema from "./graphql/schema";

const formatResult = (result: ExecutionResult) => {
  const formattedResult: ExecutionResult = {
    data: result.data,
  };

  if (result.errors) {
    formattedResult.errors = result.errors.map(error => {
      logger.error(error);

      const options: GraphQLErrorOptions = {
        extensions: error.extensions,
        nodes: error.nodes,
        originalError: error.originalError,
        path: error.path,
        positions: error.positions,
        source: error.source,
      };

      return new GraphQLError("Sorry, something went wrong", options);
    });
  }

  return formattedResult;
};

const app = new Koa();
const router = new Router();

app.use(cors({ maxAge: 86400 }));
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(async ctx => {
  const request = {
    body: ctx.request.body,
    headers: ctx.req.headers,
    method: ctx.request.method,
    query: ctx.request.query,
  };

  if (shouldRenderGraphiQL(request)) {
    ctx.body = renderGraphiQL();
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
    });

    ctx.respond = false;
    sendResult(result, ctx.res, formatResult);
  }
});
app.use(helmet());

router.get("/", ctx => {
  ctx.response.status = 200;
  ctx.response.body = {
    message: "GraphQL API",
  };
});

export default app;
