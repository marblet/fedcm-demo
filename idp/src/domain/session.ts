import { randomInt } from "node:crypto";
import type { User } from "./user.js";

const sessionChars =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const generateSessionId = (): string => {
  let session = "";

  for (let i = 0; i < 20; i += 1) {
    session += sessionChars[randomInt(sessionChars.length)];
  }

  return session;
};

export class Session {
  constructor(
    public id: string,
    public users: User[],
  ) {}

  static generate(user: User, repository: SessionRepository): Session {
    // Unique Session IDを生成する
    let sessionId = generateSessionId();

    while (repository.get(sessionId)) {
      sessionId = generateSessionId();
    }

    // Sessionを保存
    const session = new Session(sessionId, [user]);
    repository.save(session);

    return session;
  }

  selectActiveUser(user: User, repository: SessionRepository): void {
    this.users = [
      user,
      ...this.users.filter((sessionUser) => sessionUser.id !== user.id),
    ];
    repository.save(this);
  }
}

export interface SessionRepository {
  get(sessionId: string): Session | undefined;
  save(session: Session): void;
  delete(sessionId: string): void;
}
