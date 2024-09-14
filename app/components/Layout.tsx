import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <header className="py-8 flex justify-between items-center">
          <nav>
            <Link href="/" className="mr-6 text-gray-900 dark:text-gray-100">
              홈
            </Link>
            <Link href="/blog" className="text-gray-900 dark:text-gray-100">
              블로그
            </Link>
          </nav>
          <DarkModeToggle />
        </header>
        <main className="text-gray-900 dark:text-gray-100 mt-32">
          {children}
        </main>
        {/* <footer className="py-8 text-gray-600 dark:text-gray-400">
          <p>© 2023 My Blog</p>
        </footer> */}
      </div>
    </div>
  );
}
