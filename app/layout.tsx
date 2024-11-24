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
      className="bg-[#F7F7F7] dark:bg-[#100D0E]"
    >
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="bg-[#F7F7F7] dark:bg-[#100D0E] min-h-screen overflow-y-auto">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
