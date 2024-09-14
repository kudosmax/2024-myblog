import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {" "}
        {/* 여기를 수정 */}
        <header className="py-4 sm:py-6 md:py-8 flex justify-between items-center">
          {" "}
          {/* 여기를 수정 */}
          <nav>
            <Link
              href="/"
              className="mr-4 sm:mr-6 text-sm sm:text-base text-gray-900 dark:text-gray-100"
            >
              {" "}
              {/* 여기를 수정 */}홈
            </Link>
            <Link
              href="/blog"
              className="text-sm sm:text-base text-gray-900 dark:text-gray-100"
            >
              {" "}
              {/* 여기를 수정 */}
              블로그
            </Link>
          </nav>
          <DarkModeToggle />
        </header>
        <main className="text-gray-900 dark:text-gray-100 text-sm sm:text-base">
          {children}
        </main>{" "}
        {/* 여기를 수정 */}
      </div>
    </div>
  );
}
