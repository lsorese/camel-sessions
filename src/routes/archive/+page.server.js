import { getAllSessions } from '$lib/sessionData.js';

export function load() {
  const sessions = getAllSessions();

  return {
    sessions
  };
}
