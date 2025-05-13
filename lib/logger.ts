// lib/logger.ts
interface LogContext {
  component?: string;
  event?: string;
  error_message?: string;
  status_code?: number | string; // Can be string like 'N/A' for network errors
  user_id?: string | null;
  timestamp?: string;
  [key: string]: any; // Allow other context
}

const logger = {
  error: (message: string, context?: LogContext): void => {
    // In a real application, this would send logs to a logging service.
    // For now, we can log to console in a structured way for visibility,
    // but tests will spy on this method directly.
    console.error(JSON.stringify({ message, ...context }, null, 2));
  },
  // We can add other log levels like info, warn, debug as needed.
};

export default logger;