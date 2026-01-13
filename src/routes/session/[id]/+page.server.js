import { getSessionByNumber } from '$lib/sessionData.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const session = getSessionByNumber(params.id);

  if (!session) {
    throw error(404, 'Session not found');
  }

  return {
    session
  };
}
