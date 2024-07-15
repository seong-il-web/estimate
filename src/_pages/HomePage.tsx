"use client";

import FullscreenSwiper from "@/_components/FullscreenSwiper";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY > sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
          section.classList.add("opacity-100");
          section.classList.remove("opacity-0");
        } else {
          section.classList.add("opacity-0");
          section.classList.remove("opacity-100");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full">
      <section id="home" className="min-h-screen flex items-center bg-blue-50 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col items-center">
          <div className="w-full mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4">
              혁신적인 솔루션
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              당신의 비즈니스를 위한 최고의 선택
            </p>
          </div>
          <div className="w-full aspect-video max-w-2xl">
            <div className="w-full h-full bg-gray-200 flex justify-center items-center rounded-lg">
              <span className="text-gray-500 text-sm sm:text-base">이미지 영역</span>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="h-screen">
        <FullscreenSwiper />
      </section>

      <section id="about" className="min-h-screen flex items-center bg-green-50 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col items-center">
          <div className="w-full mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4">
              우리는 누구인가요?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">고객 중심의 혁신적인 기업</p>
          </div>
          <div className="w-full aspect-video max-w-2xl">
            <div className="w-full h-full bg-gray-200 flex justify-center items-center rounded-lg">
              <span className="text-gray-500 text-sm sm:text-base">이미지 영역</span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="min-h-screen flex items-center bg-yellow-50 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col items-center">
          <div className="w-full mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4">
              우리의 서비스
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">고객의 니즈에 맞는 맞춤형 솔루션</p>
          </div>
          <div className="w-full aspect-video max-w-2xl">
            <div className="w-full h-full bg-gray-200 flex justify-center items-center rounded-lg">
              <span className="text-gray-500 text-sm sm:text-base">이미지 영역</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
