"use client"; // 클라이언트 컴포넌트로 변경

import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(href));
    return (
      <Link
        href={href}
        className={`mr-4 sm:mr-6 text-sm sm:text-base text-[#231F20] dark:text-[#F3EED4] relative ${
          isActive ? "font-semibold" : ""
        }`}
      >
        {children}
        {isActive && (
          <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#231F20] dark:bg-[#F3EED4] rounded-full"></span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#100D0E] text-[#231F20] dark:text-[#F3EED4] transition-colors duration-200 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <header className="py-4 sm:py-6 md:py-8 flex justify-between items-center">
          <nav>
            <NavLink href="/">🌐</NavLink>
            <NavLink href="/category/about">🥖</NavLink>
            <NavLink href="/category/me">💬</NavLink>
          </nav>
          <DarkModeToggle />
        </header>
        <main className="text-gray-900 dark:text-gray-100 text-sm sm:text-base">
          {children}
        </main>
      </div>
    </div>
  );
}
