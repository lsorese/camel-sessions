import { getSessionByNumber, getAllSessions } from '$lib/sessionData.js';
import { error } from '@sveltejs/kit';

export function entries() {
  const sessions = getAllSessions();
  return sessions.map(session => ({
    id: session.session.toString()
  }));
}

export function load({ params }) {
  const session = getSessionByNumber(params.id);

  if (!session) {
    throw error(404, 'Session not found');
  }

  return {
    session
  };
}
