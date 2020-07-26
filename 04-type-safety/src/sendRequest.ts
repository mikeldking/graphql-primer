import { GraphQLClient } from "graphql-request";
import { print } from "graphql/language/printer";
import { Variables } from "graphql-request/dist/src/types";
import { ASTNode } from "graphql";
const config = require("../apollo.config.js");
const client = new GraphQLClient(config.client.service.url, {
  headers: config.client.service.headers
});

async function sendRequest<T>(queryAST: ASTNode, variables?: Variables) {
  const query = print(queryAST);
  return client.request<T>(query, variables);
}

export default sendRequest;
