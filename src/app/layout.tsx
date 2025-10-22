import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "股票搜索",
  description: "根据名称或代码查询股票信息",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <main style={{ margin: "0 auto", maxWidth: 720, padding: "48px 24px 80px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
