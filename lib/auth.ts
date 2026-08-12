import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "default-secure-loop-secret-key-123456";

// SHA-256 password hashing helper
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Custom lightweight HMAC-SHA256 JWT signature generator
export function signJWT(payload: any): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  // Add expiration (e.g. 7 days)
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString("base64url");
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}

// Decode and verify HMAC-SHA256 JWT signature
export function verifyJWT(token: string): any {
  try {
    const [header, body, signature] = token.split(".");
    if (!header || !body || !signature) return null;

    const expectedSignature = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    // Check expiration
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      return null;
    }
    return payload;
  } catch (e) {
    return null;
  }
}

// Read JWT from cookies in a standard HTTP Request or NextRequest
export function getSessionUser(request: any): { id: string; name: string; email: string; role: string; workspaceId: string | null } | null {
  try {
    let token = "";
    // If request.cookies is a NextRequest cookies helper
    if (request.cookies && typeof request.cookies.get === "function") {
      token = request.cookies.get("token")?.value || "";
    } else {
      // Direct parsing of headers for custom request contexts
      const cookieHeader = request.headers?.get?.("cookie") || request.headers?.cookie || "";
      const match = cookieHeader.match(/token=([^;]+)/);
      if (match) token = match[1];
    }

    if (!token) return null;
    return verifyJWT(token);
  } catch (e) {
    return null;
  }
}

// Middleware RBAC validation helper
export function requireRole(role: string, allowedRoles: string[]): boolean {
  return allowedRoles.includes(role.toUpperCase());
}
