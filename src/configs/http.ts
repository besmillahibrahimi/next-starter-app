import Parse from 'parse';

Parse.initialize(process.env.NEXT_PUBLIC_PARSE_APP_ID!, process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_KEY, process.env.NEXT_PUBLIC_PARSE_CLIENT_KEY!);

//javascriptKey is required only if you have it on server.

Parse.serverURL = process.env.NEXT_PUBLIC_PARSE_ADDRESS!

export default Parse;