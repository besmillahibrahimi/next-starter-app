import Fetch from "@/configs/api/apiConfig";
import { AppContants } from "@/lib/constants";

import { cookies } from "next/headers";

export default async function TestServerSidePage() {
  console.log(
    "  getCookie   ---    ",
    cookies().get(AppContants.ParseSessionCookieName)?.value
  );

  const res = await Fetch({
    url: "classes/ideas",
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 3600 },
    token: cookies().get(AppContants.ParseSessionCookieName)?.value,
  });
  console.log("mm test fetch ----   .  ,  ", res);

  return (
    <div>
      {res.results ? (
        res.results.map((item: any) => {
          return (
            <div className="flex flex-row space-x-6">
              <h1>{item.name}</h1>
              <h1>{item.desc}</h1>
            </div>
          );
        })
      ) : (
        <p> NO DATA ....</p>
      )}
    </div>
  );
}
