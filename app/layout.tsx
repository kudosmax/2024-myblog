import { Providers } from "./providers";
import Layout from "./components/Layout";
import "./globals.css";

export const metadata = {
  title: "PCTWORLD",
  description: "WELCOME",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-background-light dark:bg-background-dark"
    >
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark min-h-screen overflow-y-auto">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
