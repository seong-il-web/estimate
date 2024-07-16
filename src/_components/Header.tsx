"use client";

import { useState, useEffect, useCallback } from "react";
import { FcStatistics } from "react-icons/fc";

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
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center relative z-10">
        <div className="text-2xl font-bold text-gray-800">성일씨앤피</div>
      </nav>
    </header>
  );
}
