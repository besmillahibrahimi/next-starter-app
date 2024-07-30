"use client";

import { Button } from "@/components/ui/button";
import { setCookie } from "cookies-next";

export default function Home() {
  const login = () => {
    // const res = fetch("http://localhost:3000/api/auth/sign-in", {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "post",
    //   body: JSON.stringify({
    //     username: "testtest",
    //     password: "testtest",
    //   }),
    // }).then(async (re) => {
    //   const data = await re.json();
    //   const { user, sessionToken } = data;
    //   setCookie("session-token", sessionToken);
    //   console.log("LOggedldsjkf ", data);
    // });
  };
  return (
    <main className="container">
      <Button onClick={() => login()}>Log in</Button>
    </main>
  );
}
