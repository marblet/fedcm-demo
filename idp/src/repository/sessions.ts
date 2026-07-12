import { type SessionRepository, Session } from "../domain/session.js";

const sessions = new Map<string, Session>();

const getSession = (sessionId: string): Session | undefined => {
  return sessions.get(sessionId);
};

const saveSession = (session: Session): void => {
  sessions.set(session.id, session);
};

const deleteSession = (sessionId: string): void => {
  sessions.delete(sessionId);
};

export const sessionRepository: SessionRepository = {
  get: getSession,
  save: saveSession,
  delete: deleteSession,
};
