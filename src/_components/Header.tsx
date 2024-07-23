"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import logo from "@/_assets/logo.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    // 초기 스크롤 상태 확인
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`absolute inset-0 bg-white shadow-md transition-opacity duration-300 ease-in-out ${
          isScrolled ? "opacity-90" : "opacity-0"
        }`}
      ></div>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center relative z-10 mobile:p-[8px]">
        <div className="text-2xl font-bold text-gray-800 select-none">
          <Image
          className="mobile:w-[100px]"
            src={logo}
            alt="logo"
            width={200}
            height={54}
            sizes="(max-width: 768px) 100px, 180px"
          />
        </div>
        <div className="flex items-end gap-[8px] mobile:flex-col mobile:gap-[4px]">
          <span className="mobile:text-base md:text-3xl text-black font-bold">교재전문 제작 업체</span>
          <span className="mobile:text-2xl md:text-5xl font-bold text-[#bd1f2b]">성일</span>
        </div>
      </nav>
    </header>
  );
}