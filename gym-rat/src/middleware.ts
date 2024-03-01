// This function can be marked `async` if using `await` inside
export default async function middleware(request: any) {
  // const session = await getSession({ req: request });
  // // console.log("middleware", session);
  // //
  // const token = await getToken({ req: request });
  // if (!token) {
  //   console.log("not auth");
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // } else {
  //   console.log("ready auth");
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: "/api/:function*",
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
