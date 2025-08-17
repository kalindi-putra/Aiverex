const SESSION_DURATION = 2 * 60 * 60 * 1000;

export const sessionManager = {
  setSession: (userData) => {
    const expiresAt = new Date().getTime() + SESSION_DURATION;
    const sessionData = {
      userData,
      expiresAt
    };
    sessionStorage.setItem('userSession', JSON.stringify(sessionData));
  },

  getSession: () => {
    const sessionData = sessionStorage.getItem('userSession');
    if (!sessionData) return null;

    const { userData, expiresAt } = JSON.parse(sessionData);
    if (new Date().getTime() > expiresAt) {
      sessionManager.clearSession();
      return null;
    }
    return userData;
  },

  clearSession: () => {
    sessionStorage.removeItem('userSession');
  }
};