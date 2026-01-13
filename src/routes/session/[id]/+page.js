import { getAllSessions } from '$lib/sessionData.js';

export function entries() {
  const sessions = getAllSessions();
  return sessions.map(session => ({
    id: session.session.toString()
  }));
}
