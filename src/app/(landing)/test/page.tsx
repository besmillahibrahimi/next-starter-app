import ParseNode from "@/configs/parse/parse-node";
import { AppContants } from "@/lib/constants";
import { cookies } from "next/headers";

export default async function Home() {
  const token = cookies().get(AppContants.ParseSessionCookieName)?.value;
  let user;
  try {
    if (token) {
      user = await ParseNode.User.become(token!);
      // user = ParseNode.User.?current();
      console.log(
        "sldfj username is",
        user?.get("username"),
        user?.get("email")
      );
    }
  } catch (err) {
    console.log("00sdfsdf", err);
  }
  return (
    <main className="container">
      <p>username: {user?.get("username")}</p>
      <p>username: {user?.get("email")}</p>
    </main>
  );
}
