import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookies = request.headers.get("cookie");
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/auth/login" || path === "/auth/register";

  if (!cookies && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const isAuthUserOrNotResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN_URL}api/v1/auth/authenticate`,
    {
      headers: {
        "Content-Type": "application/json",
        cookie: cookies || "",
      },
    }
  );

  const isAuthenticateOrNot = await isAuthUserOrNotResponse.json();

  if (cookies && isPublicPath) {
    if (isAuthenticateOrNot.success) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (cookies && !isPublicPath) {
    if (isAuthenticateOrNot.success) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/auth/login", "/auth/register", "/quiz-selection"],
};
