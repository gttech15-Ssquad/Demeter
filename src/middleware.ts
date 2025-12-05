import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};

export function middleware(req: NextRequest) {
  const tokenExists = req.cookies.has("VIRTUPAY_USER_TOKEN");
  const url = req.nextUrl.clone();

  const publicRoutes = ["/signin", "/signup"];

  // Allow public routes
  if (publicRoutes.includes(url.pathname)) {
    if (tokenExists && url.pathname === "/signin") {
      // Redirect logged-in users away from signin
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Block protected routes
  if (!tokenExists) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// import { NextURL } from "next/dist/server/web/next-url";
// import { NextRequest, NextResponse } from "next/server";

// export const config = {
//   matcher: ["/", "/signin", "/signup", "/:path*"],
//   name: "middleware",
// };

// export function middleware(req: NextRequest) {
//   const hasToken = req.cookies.has("VIRTUPAY_USER_TOKEN");
//   const url = req.nextUrl.clone();
//   // const isOnDashboard = url.pathname = "/signin";
//   const isOnDashboard = !["/signin", "/signup"].includes(url.pathname);

//   const redirectResponse = (url: string | NextURL) => {
//     const response = NextResponse.redirect(url);
//     response.headers.set("x-middleware-cache", "no-cache");
//     return response;
//   };

//   if (!hasToken && isOnDashboard) {
//     url.pathname = "/signin";
//     return redirectResponse(url);
//   }

//   return NextResponse.next();
// }

// import { NextRequest, NextResponse } from "next/server";

// export const config = {
//   matcher: ["/", "/signin", "/signup", "/:path*"],
// };

// export function middleware(req: NextRequest) {
//   const hasToken = req.cookies.has("VIRTUPAY_USER_TOKEN");
//   const url = req.nextUrl.clone();
//   // const isOnDashboard = url.pathname.startsWith("/dashboard")
//   const isOnDashboard = !["/signin", "/signup"].includes(url.pathname);

//   const redirectResponse = (url: URL) => {
//     const response = NextResponse.redirect(url);
//     response.headers.set("x-middleware-cache", "no-cache"); // disable caching
//     return response;
//   };

//   // If token exists, don’t allow /signin or /signup
//   // if (hasToken && (url.pathname === "/signin" || url.pathname === "/signup")) {
//   //   url.pathname = "/";
//   //   return redirectResponse(url);
//   // }

//   // If no token, block dashboard access
//   if (!hasToken && isOnDashboard) {
//     url.pathname = "/signin";
//     // url.searchParams.set("expired", "true"); // flag for client popup
//     return redirectResponse(url);
//   }

//   return NextResponse.next();
// }
