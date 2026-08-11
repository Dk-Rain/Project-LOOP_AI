export function requireRole(role: string) {
  return role === 'admin';
}

export function getSessionUser() {
  return { id: 'user-1', role: 'admin' };
}
