import {createPeer, createSession} from 'snex';

export async function startSession(sessionId) {
  if (!sessionId) {
    const peer = createPeer();
    return createSession(peer);
  }
  
  //FIX: force uppercase
  sessionId = sessionId.toUpperCase();

  for (let count = 0;; count++) {
    try {
      const sessionAttempt = sessionId + (count > 0 ? count : '');
      console.log('Trying session', sessionAttempt);
      const peer = createPeer(sessionAttempt);
      return await createSession(peer);
    } catch (e) {
      console.log(e);
    }
  }
}
