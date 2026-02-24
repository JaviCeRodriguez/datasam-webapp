export const ROLE_NAMES = {
  user: "user",
  admin: "admin",
  collaborator: "collaborator",
} as const;

export const ADMIN_ALLOWED_ROLES = new Set<string>([
  ROLE_NAMES.admin,
  ROLE_NAMES.collaborator,
]);
