import { HandlerContext } from "$fresh/server.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import users from "../../db/users.ts";

let { CLIENT_ID, CLIENT_SECRET, RED_URL } = config();
if (!CLIENT_ID) {
  CLIENT_ID = Deno.env.get("CLIENT_ID") || "";
}
if (!CLIENT_SECRET) {
  CLIENT_SECRET = Deno.env.get("CLIENT_SECRET") || "";
}
if (!RED_URL) {
  RED_URL = Deno.env.get("RED_URL") || "";
}

async function getAccessToken(code: string) {
  const client_id = CLIENT_ID;
  const client_secret = CLIENT_SECRET;
  const redirect_uri = RED_URL;
  const grant_type = "authorization_code";
  const data = {
    client_id,
    client_secret,
    redirect_uri,
    code,
    grant_type,
  };

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  });

  const tokenData = await response.json();
  return tokenData.access_token;
}

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  // get code from query parameters
  const code = req.url.split("?")[1].split("=")[1];
  // get access token from Google
  const accessToken = await getAccessToken(code);

  // get user info from Google
  const endpoint =
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  // return user info
  // TODO: save user info to database
  if (!data?.email || !data?.name || !data?.picture) {
    return new Response("Invalid user data", { status: 400 });
  }

  const email = data.email;
  const user = await users.loginOrCreate(email);

  return new Response(JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
