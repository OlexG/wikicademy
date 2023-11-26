import { User } from "../types/user.ts";
import db from "./driver.ts";

class Users {
  async create(email: string): Promise<User> {
    const session = await crypto.randomUUID();
    const user = { id: await crypto.randomUUID(), email, session };
    await db.users.create({
      data: user,
    });
    return user;
  }

  async loginOrCreate(email: string): Promise<User> {
    const user = await db.users.findFirst({
      where: { email },
    });

    if (user) {
      const session = await crypto.randomUUID();
      await db.users.update({
        where: { id: user.id },
        data: { session },
      });
      return { id: user.id, session, email };
    }
    return this.create(email);
  }

  async printAll() {
    const users = await db.users.findMany({});
    console.log(users);
  }

  async confirmSession(email: string, session: string): Promise<boolean> {
    const user = await db.users.findFirst({
      where: { email, session },
    });
    return !!user;
  }

  async getUser(email: string): Promise<User | null> {
    const user = await db.users.findFirst({
      where: { email },
    });
    if (!user) return null;
    return { id: user.id, email, session: user.session };
  }
}

const users = new Users();

export default users;
