import Header from "@/_components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "성일",
  description: "교육교재,학원교재 견적은 성일씨앤피",
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
