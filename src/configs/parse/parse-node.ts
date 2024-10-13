// import ParseNode from "parse/node";
import ParseNode from "parse/node";

ParseNode.initialize(
  process.env.NEXT_PUBLIC_PARSE_APP_ID!,
  process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_KEY
);

ParseNode.serverURL = process.env.NEXT_PUBLIC_PARSE_ADDRESS!;

export default ParseNode;
