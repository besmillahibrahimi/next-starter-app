// import ParseNode from "parse/node";
import ParseNode from "parse/node";

ParseNode.initialize(
  process.env.PARSE_APP_ID!,
  process.env.PARSE_JAVASCRIPT_KEY,
  process.env.PARSE_CLIENT_KEY!
);

//javascriptKey is required only if you have it on server.

ParseNode.serverURL = process.env.PARSE_ADDRESS!;

export default ParseNode;
