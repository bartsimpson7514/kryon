import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(["/tasks(.*)"])

export default clerkMiddleware(
  (auth, req) => {
    if (!auth().userId && isProtectedRoute(req)) {
      // Add custom logic to run before redirecting

      return auth().redirectToSignIn()
    }
  },
  // { debug: process.env.NODE_ENV === "development" },
)

/**
 * Protect all routes  */
// const isPublicRoute = createRouteMatcher([

//   "/tasks(.*)",
//   "/workloads(.*)",
//   "/forgot-password",
// ])

// export default clerkMiddleware(
//   (auth, request) => {
//     if (!isPublicRoute(request)) {
//       auth().protect()
//     }
//   },
//   { debug: process.env.NODE_ENV === "development" },
// )

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
