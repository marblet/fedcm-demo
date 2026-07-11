import { randomInt } from "node:crypto";

const sessions = new Map<string, string[]>();
const sessionChars =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const generateSessionId = (): string => {
  let session = "";

  for (let i = 0; i < 20; i += 1) {
    session += sessionChars[randomInt(sessionChars.length)];
  }

  return session;
};

const generateUniqueSessionId = (): string => {
  let session = generateSessionId();

  while (getSessionUserIds(session)) {
    session = generateSessionId();
  }

  return session;
};

export const getSessionUserIds = (session: string): string[] | undefined => {
  return sessions.get(session);
};

export const generateSession = (userIds: string[]): string => {
  const sessionId = generateUniqueSessionId();
  sessions.set(sessionId, userIds);
  return sessionId;
};

export const updateSession = (session: string, userIds: string[]): void => {
  sessions.set(session, userIds);
};

export const deleteSession = (session: string): void => {
  sessions.delete(session);
};
