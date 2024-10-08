// import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
// import React from "react";
// import { Link, Outlet } from "react-router-dom";
// // Import your publishable key
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }
// const RootLayout = () => {
//   return (
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
//       <div className="  px-16 py-4 h-screen flex flex-col">
//         <header className=" flex justify-between items-center">
//           <Link to={"/"} className=" flex items-center font-bold gap-2">
//             <img src="/logo.png" alt="" className="w-8 h-8 " />
//             <span>Google Chat AI</span>
//           </Link>
//           <div>
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </div>
//         </header>
//         <main className=" lg:flex-1 overflow-hidden">
//           <Outlet />
//         </main>
//       </div>
//     </ClerkProvider>
//   );
// };

// export default RootLayout;
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const queryClient = new QueryClient();
const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className=" px-5 lg:px-16 py-4 h-screen flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center">
            <Link to="/" className="flex items-center font-bold gap-2">
              <img
                src="/logo.png"
                alt="logo"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
              <span className="text-sm sm:text-base lg:text-lg">
                Google Chat AI
              </span>
            </Link>

            {/* User Button (shown when signed in) */}
            <div>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-hidden mt-4 sm:mt-6">
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
