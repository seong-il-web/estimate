import Header from "@/_components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Toss 스타일 랜딩 페이지",
  description: "Toss 웹사이트를 모티브로 한 랜딩 페이지",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
