"use client";

import ParseBrowser from "@/configs/parse/parse-browser";
import { useEffect, useState } from "react";

export default function UserName() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Only run this effect in the browser
    const currentUser = ParseBrowser.User.current();
    if (currentUser) {
      setEmail(currentUser.get("email"));
    }
  }, []);

  const p = <p>username: {ParseBrowser.User.current()?.get("email")}</p>;
  console.log("-----", p);
  return (
    <div>
      <p>username: {email}</p>
    </div>
  );
}
