/**
 * Environment-gated logging utility
 *
 * In development (__DEV__), logs all messages for debugging.
 * In production, only logs errors and critical info to minimize data leaks.
 *
 * Usage:
 * - logger.debug('Message', data) - Dev only
 * - logger.info('Message') - Always shown but sanitized
 * - logger.warn('Message') - Dev only
 * - logger.error('Error:', error) - Always logged
 */

const DEBUG = __DEV__;

/**
 * Redact sensitive data from logging
 */
const redactEmail = (email: string): string => {
  if (!email || typeof email !== "string") return "[invalid-email]";
  const [name, domain] = email.split("@");
  if (!name || !domain) return "[invalid-email]";
  return `${name[0]}***@${domain}`;
};

const redactToken = (token: string | undefined): string => {
  if (!token) return "[no-token]";
  if (token.length < 20) return "[short-token]";
  return `${token.substring(0, 10)}...[REDACTED]`;
};

const redactUserId = (userId: string | undefined): string => {
  if (!userId) return "[no-id]";
  return `[user:${userId.substring(0, 8)}...]`;
};

export const logger = {
  /**
   * Debug logs (dev-only)
   * Use for detailed debugging information
   */
  debug: (...args: any[]) => {
    if (DEBUG) {
      console.log("[DEBUG]", ...args);
    }
  },

  /**
   * Info logs (always shown, but sanitized in production)
   * Use for non-sensitive operational information
   */
  info: (message: string, data?: any) => {
    console.log("[INFO]", message, data);
  },

  /**
   * Warning logs (dev-only)
   * Use for potentially problematic situations
   */
  warn: (...args: any[]) => {
    if (DEBUG) {
      console.warn("[WARN]", ...args);
    }
  },

  /**
   * Error logs (always shown, but redacted in production)
   * Use for errors that should always be visible
   */
  error: (message: string, error?: any) => {
    if (DEBUG) {
      // In development, show full error
      console.error("[ERROR]", message, error);
    } else {
      // In production, sanitize error details
      const sanitized =
        error instanceof Error
          ? {
              message: error.message,
              name: error.name,
              code: (error as any).code,
            }
          : error;
      console.error("[ERROR]", message, sanitized);
    }
  },

  /**
   * Auth-specific logging (for authentication flows)
   * Automatically redacts sensitive data
   */
  authDebug: (message: string, data?: any) => {
    if (DEBUG && data) {
      const redacted = {
        ...data,
        email: data.email ? redactEmail(data.email) : undefined,
        token: data.token ? redactToken(data.token) : undefined,
        userId: data.userId ? redactUserId(data.userId) : undefined,
      };
      console.log("[AUTH-DEBUG]", message, redacted);
    }
  },

  /**
   * API-specific logging (for API calls)
   * Automatically redacts sensitive headers and tokens
   */
  apiDebug: (message: string, data?: any) => {
    if (DEBUG && data) {
      const redacted = {
        ...data,
        headers: data.headers
          ? {
              ...data.headers,
              Authorization: data.headers.Authorization
                ? redactToken(data.headers.Authorization)
                : undefined,
            }
          : undefined,
      };
      console.log("[API-DEBUG]", message, redacted);
    }
  },

  /**
   * User data logging (for profile/user info)
   * Automatically redacts PII
   */
  userDebug: (message: string, user?: any) => {
    if (DEBUG && user) {
      const redacted = {
        ...user,
        email: user.email ? redactEmail(user.email) : undefined,
        userId: user.userId ? redactUserId(user.userId) : undefined,
      };
      console.log("[USER-DEBUG]", message, redacted);
    }
  },
};

export default logger;
