import { HandlerContext } from "$fresh/server.ts";
import {
  getCourse,
  handlePost,
} from "../../controllers/courseControllers.ts";
import users from "../../db/users.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const requestMethod = req.method;
  const email = req.headers.get("email");
  const session = req.headers.get("session");
  if (!email || !session) {
    return new Response("Invalid user data", { status: 401 });
  }
  const validUser = await users.confirmSession(email, session);
  if (!validUser) {
    return new Response("Invalid user data", { status: 401 });
  }
  const user = await users.getUser(email);
  if (!user) {
    return new Response("Invalid user data", { status: 401 });
  }
  switch (requestMethod) {
    case "GET": {
      const result = await getCourse(req);
      return result;
    }
    case "POST": {
      const result = await handlePost(req, user);
      return result;
    }
    default:
      return new Response("Invalid request method", { status: 405 });
  }
};
