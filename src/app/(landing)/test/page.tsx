import ParseBrowser from "@/configs/parse/parse-browser";
import UserName from "./UserName";

export default function Home() {
  console.log("---0 user email", ParseBrowser.User.current()?.get("email"));
  return (
    <main className="container">
      <UserName />
    </main>
  );
}
