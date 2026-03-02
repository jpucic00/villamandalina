import createMiddleware from "next-intl/middleware";
import { routing } from "./routing";

export default createMiddleware(routing);

export const config = {
  // Match all routes except API routes, Next.js internals, and static files
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
