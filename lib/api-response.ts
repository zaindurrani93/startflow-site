import { NextResponse } from "next/server";

export function badRequest(error: string, fieldErrors?: Record<string, string>) {
  return NextResponse.json(
    fieldErrors ? { error, fieldErrors } : { error },
    { status: 400 }
  );
}

export function serverError(message = "Something went wrong. Please try again.") {
  return NextResponse.json({ error: message }, { status: 500 });
}
