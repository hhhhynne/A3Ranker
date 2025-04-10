"use client";
import navigation from "@/lib/types/navigation";
import NavigationDesktopItem from "./navigation-desktop-item";
import ThemeSwitch from "../themeSwitch/themeSwitch";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/providers/authProvider";

const Navbar = () => {
  const { signOut, isAuthenticated } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background px-8">
        <nav className="flex items-center justify-between gap-6 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/">
              <h1 className="text-2xl font-extrabold">A3RANKER</h1>
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              {navigation.map((item, i) => (
                <NavigationDesktopItem item={item} key={i} />
              ))}
            </div>
          </div>
            <div className="ml-auto">
            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button variant="default">
                  <Link href="/createUser">Create User</Link>
                </Button>
                <Button variant="outline">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <Button variant="outline" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            )}
            </div>

          <div className="flex items-center">
            <ThemeSwitch />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
