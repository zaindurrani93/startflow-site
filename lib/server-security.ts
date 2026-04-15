import { NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function now() {
  return Date.now();
}

function cleanupRateLimitStore(currentTime: number) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= currentTime) {
      rateLimitStore.delete(key);
    }
  }
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return realIp?.trim() || "unknown";
}

export function checkRateLimit(
  request: Request,
  key: string,
  limit: number,
  windowMs: number
) {
  const currentTime = now();
  cleanupRateLimitStore(currentTime);

  const bucketKey = `${key}:${getClientIp(request)}`;
  const current = rateLimitStore.get(bucketKey);

  if (!current || current.resetAt <= currentTime) {
    rateLimitStore.set(bucketKey, {
      count: 1,
      resetAt: currentTime + windowMs
    });

    return { ok: true as const };
  }

  if (current.count >= limit) {
    return {
      ok: false as const,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - currentTime) / 1000))
    };
  }

  current.count += 1;
  rateLimitStore.set(bucketKey, current);

  return { ok: true as const };
}

export function createRateLimitResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: "Too many requests. Please wait a moment and try again." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds)
      }
    }
  );
}

export async function parseJsonBody(
  request: Request,
  options?: { maxBytes?: number }
) {
  const maxBytes = options?.maxBytes ?? 12_000;
  const contentLengthHeader = request.headers.get("content-length");
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : NaN;

  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    return { ok: false as const, status: 413, error: "Request body is too large." };
  }

  const raw = await request.text().catch(() => "");

  if (!raw) {
    return { ok: false as const, status: 400, error: "Invalid request body." };
  }

  if (raw.length > maxBytes) {
    return { ok: false as const, status: 413, error: "Request body is too large." };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ok: false as const, status: 400, error: "Invalid request body." };
    }

    return {
      ok: true as const,
      data: parsed as Record<string, unknown>
    };
  } catch {
    return { ok: false as const, status: 400, error: "Invalid request body." };
  }
}

export function validateAllowedKeys(
  input: Record<string, unknown>,
  allowedKeys: readonly string[]
) {
  return Object.keys(input).filter((key) => !allowedKeys.includes(key));
}

export function sanitizePlainText(
  value: unknown,
  options?: { maxLength?: number; multiline?: boolean }
) {
  const maxLength = options?.maxLength ?? 500;
  const multiline = options?.multiline ?? false;

  if (typeof value !== "string") {
    return "";
  }

  let sanitized = value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();

  if (!multiline) {
    sanitized = sanitized.replace(/\s+/g, " ");
  } else {
    sanitized = sanitized
      .split("\n")
      .map((line) => line.trim().replace(/\s+/g, " "))
      .join("\n")
      .trim();
  }

  return sanitized.slice(0, maxLength);
}

export function sanitizeEmail(value: unknown) {
  return sanitizePlainText(value, { maxLength: 254 }).toLowerCase();
}

export function sanitizePhone(value: unknown) {
  return sanitizePlainText(value, { maxLength: 30 }).replace(/[^\d+().\-\s]/g, "");
}

export function isValidEmail(value: string) {
  return EMAIL_REGEX.test(value);
}

export function parseStartedAt(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}

export function isLikelyBot(honeypot: string, startedAt: number, minimumAgeMs = 2500) {
  if (honeypot) {
    return true;
  }

  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return true;
  }

  return now() - startedAt < minimumAgeMs;
}

export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message = "Request timed out."
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

export function logServerError(context: string, error: unknown) {
  console.error(`[${context}]`, error);
}
