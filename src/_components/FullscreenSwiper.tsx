"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  { color: "bg-blue-500", text: "Slide 1" },
  { color: "bg-green-500", text: "Slide 2" },
  { color: "bg-purple-500", text: "Slide 3" },
];

export default function FullscreenSwiper() {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const swiper = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      navigation: true,
      pagination: { clickable: true },
      autoplay: { delay: 5000 },
      loop: true,
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <div ref={swiperRef} className="swiper w-full h-full">
        <div className="swiper-wrapper">
          {slides.map((slide, index) => (
            <div key={index} className={`swiper-slide ${slide.color} flex items-center justify-center`}>
              <div className="pt-16">
                {" "}
                {/* 헤더 높이만큼 상단 패딩 추가 */}
                <h2 className="text-white text-4xl font-bold">{slide.text}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </div>
  );
}
