import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar stays fixed/sticky on left */}
      <Sidebar />

      {/* Main content scrolls independently */}
      <main className="flex-1 overflow-y-auto">
        <header className="hidden md:flex sticky top-0 z-50 bg-gray-900 justify-end items-center border border-gray-800 px-6 py-1 gap-1 h-16">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>


        {children}
      </main>
    </div>
  );
}
