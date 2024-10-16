type cacheTypes =
  | "default"
  | "no-store"
  | "reload"
  | "no-cache"
  | "force-cache"
  | "only-if-cached";

interface IFetch {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  body?: Object;
  cache?: cacheTypes;
  next?: NextFetchRequestConfig;
  token?: string;
}

const Fetch = async ({
  url,
  method,
  body,
  cache = "default",
  next,
  token,
}: IFetch) => {
  //   try {
  const myHeaders = {
    "X-Parse-Application-Id": process.env.NEXT_PUBLIC_PARSE_APP_ID,
    "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_PARSE_REST_API_KEY,
    "X-Parse-Session-Token": token,
    "Content-Type": "application/json",
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PARSE_ADDRESS}/${url}`,
    {
      method: method,
      //@ts-ignore
      headers: myHeaders,
      body: JSON.stringify(body),
      cache: cache,
      next: next,
    }
  );

  //console.log(" reeees ---   ", response);

  //   if (!response.ok) {
  // toast({
  //   description:
  //     "Network response was not ok : " +
  //     response.status +
  //     response.statusText,
  //   variant: "error",
  // });
  //     throw new Error(
  //       "Network response was not ok : " + response.status + response.statusText
  //     );
  //   }

  return response.json();
  //   } catch (err: any) {
  //     console.log(" ERR -- ", err);
  //      toast({ description: t(`auth.error.${err.code}`), variant: "error" });
  //   } finally {
  //   }
};

export default Fetch;
